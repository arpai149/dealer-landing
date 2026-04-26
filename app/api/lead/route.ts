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

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(json?.error || "Failed to notify ARPAIBOT");
    }

    return NextResponse.json({
      success: true,
      message: "Lead sent to ARPAIBOT",
      result: json,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid lead submission" },
      { status: 400 }
    );
  }
}
