import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireUser } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import { uniqueSlug } from "@/lib/utils";
import type { Prospectus } from "@/lib/types";

export async function GET() {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const db = await readDb();
  const mine =
    user.role === "admin"
      ? db.prospectuses
      : db.prospectuses.filter((item) => item.ownerId === user.id);
  return NextResponse.json({ prospectuses: mine });
}

export async function POST(request: Request) {
  const user = await requireUser(["prospect", "admin"]);
  if (!user) return NextResponse.json({ error: "Please sign in as a creator." }, { status: 401 });

  const body = (await request.json()) as { templateId?: string; title?: string };
  const db = await readDb();
  const template = db.templates.find((item) => item.id === body.templateId && item.active);
  if (!template) {
    return NextResponse.json({ error: "Choose a template to begin." }, { status: 400 });
  }

  const created = await updateDb((store) => {
    const now = new Date().toISOString();
    const title = body.title?.trim() || template.defaults.title || "Untitled prospectus";
    const item: Prospectus = {
      id: randomUUID(),
      slug: uniqueSlug(title, store.prospectuses.map((entry) => entry.slug)),
      ownerId: user.id,
      templateId: template.id,
      status: "draft",
      title,
      tagline: template.defaults.tagline || "",
      organization: user.organization || "",
      industry: template.category,
      location: user.location || "",
      eventDate: "",
      audienceSize: "",
      overview: template.defaults.overview || "",
      audience: template.defaults.audience || "",
      demographics: template.defaults.demographics || "",
      benefits: template.defaults.benefits || "",
      packages: (template.defaults.packages || []).map((pkg) => ({
        ...pkg,
        id: randomUUID(),
      })),
      callToAction: template.defaults.callToAction || "",
      contactEmail: user.email,
      contactName: user.name,
      createdAt: now,
      updatedAt: now,
    };
    store.prospectuses.unshift(item);
    return item;
  });

  return NextResponse.json({ prospectus: created });
}
