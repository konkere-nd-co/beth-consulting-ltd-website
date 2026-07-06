import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.CONTACT_TO_EMAIL || "bethconsultingltd@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "onboarding@resend.dev";

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Resend is not configured yet. Add RESEND_API_KEY to your environment.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: `BCL Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent.",
    });
  } catch (error: any) {
    console.error("Resend contact email failed", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "We could not send your message right now. Please try again later.",
      },
      { status: 502 },
    );
  }
}
