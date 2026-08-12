import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { assistWriting } from "@/lib/ai";
import type { AiAction, AiSection } from "@/lib/types";

const actions: AiAction[] = [
  "draft",
  "rewrite",
  "shorten",
  "expand",
  "professional",
  "warm",
  "bold",
  "concise",
];

const sections: AiSection[] = [
  "overview",
  "audience",
  "demographics",
  "benefits",
  "callToAction",
  "tagline",
  "packageBenefit",
];

export async function POST(request: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  const body = (await request.json()) as {
    action?: AiAction;
    section?: AiSection;
    text?: string;
    context?: string;
    tone?: string;
  };

  if (!body.action || !actions.includes(body.action) || !body.section || !sections.includes(body.section)) {
    return NextResponse.json({ error: "Invalid writing request." }, { status: 400 });
  }

  try {
    const result = await assistWriting({
      action: body.action,
      section: body.section,
      text: body.text || "",
      context: body.context || "",
      tone: body.tone || "",
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "The writing assistant could not complete that request." },
      { status: 502 },
    );
  }
}
