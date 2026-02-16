import { NextResponse } from "next/server";
import { openai } from "@/server/ai/openai";

export async function GET() {
  const resp = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: "Reply with exactly: pong",
  });

  const text =
    resp.output_text?.trim?.() ??
    "no_text_returned";

  return NextResponse.json({ ok: true, text });
}
