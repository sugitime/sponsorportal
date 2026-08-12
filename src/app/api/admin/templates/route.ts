import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireUser } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import type { Template } from "@/lib/types";

export async function GET() {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const db = await readDb();
  return NextResponse.json({ templates: db.templates });
}

export async function POST(request: Request) {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const body = (await request.json()) as Partial<Template>;
  if (!body.name) return NextResponse.json({ error: "A name is required." }, { status: 400 });

  const template = await updateDb((db) => {
    const created: Template = {
      id: randomUUID(),
      name: body.name!,
      description: body.description || "",
      category: body.category || "Community",
      tone: body.tone || "editorial",
      accent: body.accent || "#1d1d1f",
      paper: body.paper || "#f5f5f7",
      featured: !!body.featured,
      active: body.active !== false,
      defaults: body.defaults || {},
    };
    db.templates.push(created);
    return created;
  });
  return NextResponse.json({ template });
}
