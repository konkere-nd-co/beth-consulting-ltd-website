import { Resend } from "resend";
import MailerLite from "@mailerlite/mailerlite-nodejs";

export interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
  MAILERLITE_API_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (request.method === "POST" && url.pathname === "/api/newsletter") {
      return handleNewsletter(request, env);
    }

    return new Response("Not Found", { status: 404 });
  },
};

async function handleContact(request: Request, env: Env): Promise<Response> {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const apiKey = env.RESEND_API_KEY;
    const toEmail = env.CONTACT_TO_EMAIL || "oladeleomoyemi2002@gmail.com";
    const fromEmail = env.RESEND_FROM_EMAIL || "no-reply@bethconsultingltd.com";

    if (!apiKey) {
      return Response.json(
        { error: "Resend is not configured for this worker." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: `BCL Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${String(message).replace(/\n/g, "<br />")}</p>`,
    });

    return Response.json({
      success: true,
      message: "Your message has been sent.",
    });
  } catch (error: any) {
    return Response.json(
      { error: error?.message || "We could not send your message right now." },
      { status: 502 },
    );
  }
}

async function handleNewsletter(request: Request, env: Env): Promise<Response> {
  try {
    const { email, name } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim() : "";

    if (
      !normalizedEmail ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)
    ) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const apiKey = env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "MailerLite is not configured for this worker." },
        { status: 500 },
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
      { status: 502 },
    );
  }
}
