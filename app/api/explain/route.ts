import { NextResponse } from "next/server";
import { generateExplanation } from "@/lib/aiClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic } = body;

    if (!topic || topic.trim() === "") {
      return NextResponse.json(
        { error: "Please enter a topic to continue." },
        { status: 400 }
      );
    }

    const explanation = await generateExplanation(topic);
    return NextResponse.json({ explanation });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate explanation." },
      { status: 500 }
    );
  }
}
