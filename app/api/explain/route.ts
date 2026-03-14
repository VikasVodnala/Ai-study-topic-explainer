import { NextResponse, NextRequest } from "next/server";
import { generateExplanation } from "@/lib/aiClient";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { topic } = body;

    // Error Handling for empty or invalid topic
    if (typeof topic !== "string" || topic.trim() === "") {
      return NextResponse.json(
        { error: "Please enter a topic to continue." },
        { status: 400 }
      );
    }

    const explanation = await generateExplanation(topic);

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error(error); // helpful for debugging
    return NextResponse.json(
      { error: "Failed to generate explanation. Please try again." },
      { status: 500 }
    );
  }
}
