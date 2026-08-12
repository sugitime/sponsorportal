import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { updateDb } from "@/lib/db";
import { completionScore } from "@/lib/utils";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(_request: Request, ctx: Ctx) {
  const user = await requireUser(["prospect", "admin"]);
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const { id } = await ctx.params;

  const result = await updateDb((db) => {
    const item = db.prospectuses.find((entry) => entry.id === id);
    if (!item || (user.role !== "admin" && item.ownerId !== user.id)) return null;
    if (completionScore(item) < 80) {
      return { error: "Finish the essential sections before publishing." };
    }
    if (item.status === "published") {
      item.status = "archived";
      item.publishedAt = undefined;
    } else {
      item.status = db.settings.requireModeration ? "pending" : "published";
      item.publishedAt = item.status === "published" ? new Date().toISOString() : undefined;
    }
    item.updatedAt = new Date().toISOString();
    return { prospectus: item };
  });

  if (!result) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if ("error" in result) return NextResponse.json(result, { status: 400 });
  return NextResponse.json(result);
}
