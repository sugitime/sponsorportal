import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import type { ProspectusStatus } from "@/lib/types";

export async function GET() {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const db = await readDb();
  return NextResponse.json({
    prospectuses: db.prospectuses.map((item) => ({
      ...item,
      owner: db.users.find((user) => user.id === item.ownerId),
    })),
  });
}

export async function POST(request: Request) {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const body = (await request.json()) as { id?: string; status?: ProspectusStatus };
  if (!body.id || !body.status) {
    return NextResponse.json({ error: "id and status are required." }, { status: 400 });
  }

  const updated = await updateDb((db) => {
    const item = db.prospectuses.find((entry) => entry.id === body.id);
    if (!item) return null;
    item.status = body.status!;
    item.publishedAt = body.status === "published" ? item.publishedAt || new Date().toISOString() : item.publishedAt;
    item.updatedAt = new Date().toISOString();
    return item;
  });
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ prospectus: updated });
}
