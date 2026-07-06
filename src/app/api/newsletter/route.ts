import { NextResponse } from "next/server";
import MailerLite from "@mailerlite/mailerlite-nodejs";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim() : "";

    if (
      !normalizedEmail ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)
    ) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "MailerLite is not configured yet. Add MAILERLITE_API_KEY to your environment.",
        },
        { status: 500 },
      );
    }

    const mailerlite = new MailerLite({ api_key: apiKey });

    await mailerlite.subscribers.createOrUpdate({
      email: normalizedEmail,
      fields: name ? { name } : undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing.",
    });
  } catch (error: any) {
    console.error("MailerLite signup failed", error);

    return NextResponse.json(
      {
        error:
          error?.response?.data?.message ||
          "We could not subscribe you right now. Please try again later.",
      },
      { status: 502 },
    );
  }
}
