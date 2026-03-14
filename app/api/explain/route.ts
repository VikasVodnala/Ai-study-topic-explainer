import { NextResponse, NextRequest } from "next/server";
import { generateExplanation } from "@/lib/aiClient";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { topic } = body;

    if (typeof topic !== "string" || topic.trim() === "") {
      return NextResponse.json(
        { error: "Please enter a topic to continue." },
        { status: 400 }
      );
    }

    let explanation;
    try {
      explanation = await generateExplanation(topic);
    } catch (err) {
      console.error("AI client error:", err);
      return NextResponse.json(
        { error: "AI service failed. Check API key or configuration." },
        { status: 500 }
      );
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation. Please try again." },
      { status: 500 }
    );
  }
}
