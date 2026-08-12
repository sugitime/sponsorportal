import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import type { SiteSettings } from "@/lib/types";

export async function GET() {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const db = await readDb();
  return NextResponse.json({ settings: db.settings });
}

export async function PUT(request: Request) {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const body = (await request.json()) as Partial<SiteSettings>;
  const settings = await updateDb((db) => {
    db.settings = { ...db.settings, ...body };
    return db.settings;
  });
  return NextResponse.json({ settings });
}
