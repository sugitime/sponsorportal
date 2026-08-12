import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";
import { completionScore, uniqueSlug } from "@/lib/utils";
import type { Prospectus } from "@/lib/types";

type Ctx = { params: Promise<{ id: string }> };

function canEdit(userId: string, role: string, item: Prospectus) {
  return role === "admin" || item.ownerId === userId;
}

export async function GET(_request: Request, ctx: Ctx) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const { id } = await ctx.params;
  const db = await readDb();
  const item = db.prospectuses.find((entry) => entry.id === id);
  if (!item || !canEdit(user.id, user.role, item)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({
    prospectus: item,
    template: db.templates.find((template) => template.id === item.templateId),
  });
}

export async function PATCH(request: Request, ctx: Ctx) {
  const user = await requireUser(["prospect", "admin"]);
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const { id } = await ctx.params;
  const patch = (await request.json()) as Partial<Prospectus>;

  const updated = await updateDb((db) => {
    const item = db.prospectuses.find((entry) => entry.id === id);
    if (!item || !canEdit(user.id, user.role, item)) return null;
    const next: Prospectus = {
      ...item,
      ...patch,
      id: item.id,
      ownerId: item.ownerId,
      createdAt: item.createdAt,
      updatedAt: new Date().toISOString(),
    };
    if (patch.title && patch.title !== item.title) {
      next.slug = uniqueSlug(
        patch.title,
        db.prospectuses.filter((entry) => entry.id !== item.id).map((entry) => entry.slug),
      );
    }
    const score = completionScore(next);
    if (item.status === "draft" && score === 100) next.status = "completed";
    Object.assign(item, next);
    return item;
  });

  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ prospectus: updated });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const user = await requireUser(["prospect", "admin"]);
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const { id } = await ctx.params;
  const removed = await updateDb((db) => {
    const index = db.prospectuses.findIndex((entry) => entry.id === id);
    if (index < 0) return false;
    const item = db.prospectuses[index];
    if (!canEdit(user.id, user.role, item)) return false;
    db.prospectuses.splice(index, 1);
    db.interests = db.interests.filter((interest) => interest.prospectusId !== id);
    return true;
  });
  if (!removed) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
