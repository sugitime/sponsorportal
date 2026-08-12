import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { updateDb } from "@/lib/db";
import type { Template } from "@/lib/types";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const { id } = await ctx.params;
  const body = (await request.json()) as Partial<Template>;

  const updated = await updateDb((db) => {
    const item = db.templates.find((template) => template.id === id);
    if (!item) return null;
    Object.assign(item, body, { id: item.id });
    return item;
  });
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ template: updated });
}
