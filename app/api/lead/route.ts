import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const webhook = "https://arpai1.app.n8n.cloud/webhook/arpai-lead";

    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "dealer-landing",
        submitted_at: new Date().toISOString(),
        name: body.name,
        phone: body.phone,
        email: body.email,
        vehicle: body.vehicle,
        page: "homepage",
      }),
    });

    const text = await response.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Webhook forward failed", details: json },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead sent to ARPAIBOT",
      details: json,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid lead submission" },
      { status: 400 }
    );
  }
}
