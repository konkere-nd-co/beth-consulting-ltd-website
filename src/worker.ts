import { Resend } from "resend";
import MailerLite from "@mailerlite/mailerlite-nodejs";
import { SignJWT, jwtVerify } from "jose";

export interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
  MAILERLITE_API_KEY?: string;
  DB: D1Database;
  R2: R2Bucket;
  ADMIN_PASSWORD?: string;
  JWT_SECRET?: string;
}

const getJwtSecret = (env: Env) =>
  new TextEncoder().encode(env.JWT_SECRET || "default_super_secret_key");

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Serve Uploaded Images from R2
    if (request.method === "GET" && url.pathname.startsWith("/assets/uploads/")) {
      const objectKey = url.pathname.replace("/assets/uploads/", "");
      const object = await env.R2.get(objectKey);
      if (!object) return new Response("Not found", { status: 404 });
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      return new Response(object.body as ReadableStream, { headers });
    }

    // Existing forms routes
    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }
    if (request.method === "POST" && url.pathname === "/api/newsletter") {
      return handleNewsletter(request, env);
    }

    // Auth routes
    if (request.method === "POST" && url.pathname === "/api/auth/login") {
      return handleLogin(request, env);
    }
    if (request.method === "GET" && url.pathname === "/api/auth/verify") {
      return handleVerify(request, env);
    }
    if (request.method === "POST" && url.pathname === "/api/auth/logout") {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `admin_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
        },
      });
    }

    // News Public routes
    if (request.method === "GET" && url.pathname === "/api/news") {
      return handleGetNews(request, env);
    }
    
    if (request.method === "GET" && url.pathname.startsWith("/api/news/")) {
      const match = url.pathname.match(/^\/api\/news\/([^/]+)$/);
      if (match) {
        return handleGetNewsBySlugOrId(request, env, match[1]);
      }
    }

    // Protected News routes
    if (url.pathname.startsWith("/api/news")) {
      const auth = await verifyAuth(request, env);
      if (!auth) return new Response("Unauthorized", { status: 401 });

      if (request.method === "POST" && url.pathname === "/api/news") {
        return handleCreateNews(request, env);
      }

      const match = url.pathname.match(/^\/api\/news\/([^/]+)$/);
      if (match) {
        const id = match[1];
        if (request.method === "PUT") return handleUpdateNews(request, env, id);
        if (request.method === "DELETE") return handleDeleteNews(request, env, id);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};

// --- Auth Handlers ---

async function verifyAuth(request: Request, env: Env) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/admin_token=([^;]+)/);
  if (!match) return false;
  const token = match[1];
  try {
    await jwtVerify(token, getJwtSecret(env));
    return true;
  } catch {
    return false;
  }
}

async function handleLogin(request: Request, env: Env) {
  const { password } = (await request.json()) as any;
  const correctPassword = env.ADMIN_PASSWORD || "admin123";
  if (password !== correctPassword) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(getJwtSecret(env));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
    },
  });
}

async function handleVerify(request: Request, env: Env) {
  const auth = await verifyAuth(request, env);
  if (!auth) return Response.json({ authenticated: false }, { status: 401 });
  return Response.json({ authenticated: true });
}

// --- News Handlers ---

async function handleGetNews(request: Request, env: Env) {
  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM news ORDER BY created_at DESC"
    ).all();
    return Response.json(results);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

async function handleGetNewsBySlugOrId(request: Request, env: Env, identifier: string) {
  try {
    // First try finding by ID, then by Slug
    let record = await env.DB.prepare("SELECT * FROM news WHERE id = ?").bind(identifier).first();
    if (!record) {
      record = await env.DB.prepare("SELECT * FROM news WHERE slug = ?").bind(identifier).first();
    }
    
    if (!record) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json(record);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

async function handleCreateNews(request: Request, env: Env) {
  try {
    const formData = await request.formData();
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    let slug = formData.get("slug") as string;
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    const kicker = formData.get("kicker") as string;
    const summary = formData.get("summary") as string;
    const read_more_text = (formData.get("read_more_text") as string) || "Read more →";
    const body_content = formData.get("body_content") as string;
    const external_link = formData.get("external_link") as string;
    const mentorship_data = formData.get("mentorship_data") as string;

    const image = formData.get("image") as File;
    let image_url = null;
    let image_alt = formData.get("image_alt") as string;

    if (image && image.name) {
      const objectKey = `${crypto.randomUUID()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
      await env.R2.put(objectKey, image.stream(), {
        httpMetadata: { contentType: image.type },
      });
      image_url = `/assets/uploads/${objectKey}`;
    }

    const id = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO news (id, slug, type, kicker, title, summary, image_url, image_alt, read_more_text, body_content, external_link, mentorship_data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        id,
        slug,
        type,
        kicker || null,
        title,
        summary || null,
        image_url,
        image_alt || null,
        read_more_text,
        body_content || null,
        external_link || null,
        mentorship_data || null
      )
      .run();

    return Response.json({ success: true, id });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

async function handleUpdateNews(request: Request, env: Env, id: string) {
  try {
    const formData = await request.formData();
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    let slug = formData.get("slug") as string;
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    const kicker = formData.get("kicker") as string;
    const summary = formData.get("summary") as string;
    const read_more_text = (formData.get("read_more_text") as string) || "Read more →";
    const body_content = formData.get("body_content") as string;
    const external_link = formData.get("external_link") as string;
    const mentorship_data = formData.get("mentorship_data") as string;

    const image = formData.get("image") as File;
    let image_url = formData.get("existing_image_url") as string || null;
    let image_alt = formData.get("image_alt") as string;

    if (image && image.name) {
      const objectKey = `${crypto.randomUUID()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
      await env.R2.put(objectKey, image.stream(), {
        httpMetadata: { contentType: image.type },
      });
      
      const old_image_url = formData.get("existing_image_url") as string;
      if (old_image_url && old_image_url.startsWith("/assets/uploads/")) {
        await env.R2.delete(old_image_url.replace("/assets/uploads/", ""));
      }
      
      image_url = `/assets/uploads/${objectKey}`;
    }

    await env.DB.prepare(
      `UPDATE news SET slug = ?, type = ?, kicker = ?, title = ?, summary = ?, image_url = ?, image_alt = ?, read_more_text = ?, body_content = ?, external_link = ?, mentorship_data = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
      .bind(
        slug,
        type,
        kicker || null,
        title,
        summary || null,
        image_url,
        image_alt || null,
        read_more_text,
        body_content || null,
        external_link || null,
        mentorship_data || null,
        id
      )
      .run();

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

async function handleDeleteNews(request: Request, env: Env, id: string) {
  try {
    const record = await env.DB.prepare("SELECT image_url FROM news WHERE id = ?").bind(id).first();
    if (
      record &&
      record.image_url &&
      typeof record.image_url === "string" &&
      record.image_url.startsWith("/assets/uploads/")
    ) {
      await env.R2.delete(record.image_url.replace("/assets/uploads/", ""));
    }
    await env.DB.prepare("DELETE FROM news WHERE id = ?").bind(id).run();
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// --- Original Existing Handlers ---

async function handleContact(request: Request, env: Env): Promise<Response> {
  try {
    const { name, email, message } = (await request.json()) as any;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const apiKey = env.RESEND_API_KEY;
    const toEmail = env.CONTACT_TO_EMAIL || "oladeleomoyemi2002@gmail.com";
    const fromEmail = env.RESEND_FROM_EMAIL || "no-reply@bethconsultingltd.com";

    if (!apiKey) {
      return Response.json(
        { error: "Resend is not configured for this worker." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: `BCL Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${String(
        message
      ).replace(/\n/g, "<br />")}</p>`,
    });

    return Response.json({
      success: true,
      message: "Your message has been sent.",
    });
  } catch (error: any) {
    return Response.json(
      { error: error?.message || "We could not send your message right now." },
      { status: 502 }
    );
  }
}

async function handleNewsletter(request: Request, env: Env): Promise<Response> {
  try {
    const { email, name } = (await request.json()) as any;
    const normalizedEmail = typeof email === "string" ? email.trim() : "";

    if (
      !normalizedEmail ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)
    ) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "MailerLite is not configured for this worker." },
        { status: 500 }
      );
    }

    const mailerlite = new MailerLite({ api_key: apiKey });
    await mailerlite.subscribers.createOrUpdate({
      email: normalizedEmail,
      fields: name ? { name } : undefined,
    });

    return Response.json({
      success: true,
      message: "Thank you for subscribing.",
    });
  } catch (error: any) {
    return Response.json(
      { error: error?.message || "We could not subscribe you right now." },
      { status: 502 }
    );
  }
}
