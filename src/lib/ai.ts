import OpenAI from "openai";
import type { AiAction, AiSection } from "./types";

const FALLBACK: Record<AiSection, string> = {
  overview:
    "This gathering is built to be useful. It brings the right people into a room that has been designed for conversation rather than spectacle, and it leaves them with a reason to stay in touch after the lights come up. Partners are invited to underwrite that room — and to sit inside it.",
  audience:
    "The audience is specific on purpose: practitioners, commissioners, and a public that already cares about this work. They arrive informed, they stay for the program, and they leave with names they intend to use.",
  demographics:
    "A concentrated room. Decision-makers outnumber spectators. Guests travel, they hold budget, and they treat the program as part of their year rather than a diversion from it.",
  benefits:
    "Partnership here is a named presence: a room, a page, a conversation. Recognition is restrained. Access is real. The association lasts longer than the event.",
  callToAction:
    "A small number of partnerships remain. If this belongs in your next chapter, we would like to speak while the program is still being written.",
  tagline: "A room worth entering. A partnership worth naming.",
  packageBenefit: "A named presence, a private introduction, and a credit that outlives the evening.",
};

function localRewrite(text: string, action: AiAction, section: AiSection) {
  const base = text.trim() || FALLBACK[section];
  switch (action) {
    case "shorten":
      return base.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
    case "expand":
      return `${base} The invitation is limited, the standard is high, and the people in the room will remember who made the morning possible.`;
    case "warm":
      return base.replace(/\bWe\b/g, "We would love to").replace(/\.$/, " — and we would be glad to walk you through it.");
    case "bold":
      return base.replace(/\.$/, ". This is the partnership that will be remembered.");
    case "concise":
      return base
        .replace(/\s+/g, " ")
        .replace(/, which /g, " that ")
        .split(/(?<=[.!?])\s+/)
        .slice(0, 3)
        .join(" ");
    case "professional":
      return base.replace(/\bcan't\b/gi, "cannot").replace(/!/g, ".");
    default:
      return base;
  }
}

function promptFor(input: {
  action: AiAction;
  section: AiSection;
  text: string;
  context: string;
  tone: string;
}) {
  const verbs: Record<AiAction, string> = {
    draft: "Draft a new passage from the context.",
    rewrite: "Rewrite the passage. Keep the facts. Improve the cadence.",
    shorten: "Shorten the passage by about a third. Keep the strongest sentence.",
    expand: "Expand the passage with one more concrete, useful sentence.",
    professional: "Rewrite in a calm, institutional voice.",
    warm: "Rewrite with warmth, still restrained.",
    bold: "Rewrite with more conviction, still elegant.",
    concise: "Tighten every sentence. No ornament.",
  };

  return [
    "You are the in-house writer for SponsorPortal, a premium sponsorship prospectus studio.",
    "Write like an Apple product page crossed with a well-edited institutional brochure: calm, specific, no hype, no exclamation marks, no hashtags, no emoji.",
    "Never invent attendance numbers, revenue, or celebrity names that are not in the context.",
    `Section: ${input.section}.`,
    `Instruction: ${verbs[input.action]}`,
    input.tone ? `Preferred tone: ${input.tone}.` : "",
    "Return only the passage — no preamble, no quotes.",
    input.context ? `Context:\n${input.context}` : "",
    input.text ? `Current text:\n${input.text}` : "Current text is empty. Draft from context.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function assistWriting(input: {
  action: AiAction;
  section: AiSection;
  text: string;
  context: string;
  tone: string;
}) {
  const key = process.env.XAI_API_KEY;
  if (!key) {
    return {
      text: localRewrite(input.text, input.action, input.section),
      provider: "demo" as const,
    };
  }

  const client = new OpenAI({
    apiKey: key,
    baseURL: "https://api.x.ai/v1",
  });

  const response = await client.responses.create({
    model: "grok-4.6",
    input: promptFor(input),
  });

  const text = response.output_text?.trim() || localRewrite(input.text, input.action, input.section);
  return { text, provider: "spacexai" as const };
}
