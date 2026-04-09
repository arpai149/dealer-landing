import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("ARPAIBOT lead intake:", body);

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      next: "Connect to n8n / ARPAIBOT",
      lead: body,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid lead submission",
      },
      { status: 400 }
    );
  }
}
