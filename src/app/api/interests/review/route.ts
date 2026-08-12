import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { updateDb } from "@/lib/db";

export async function POST(request: Request) {
  const user = await requireUser(["prospect", "admin"]);
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const body = (await request.json()) as { id?: string };
  const updated = await updateDb((db) => {
    const item = db.interests.find((entry) => entry.id === body.id);
    if (!item) return null;
    const prospectus = db.prospectuses.find((entry) => entry.id === item.prospectusId);
    if (!prospectus || (user.role !== "admin" && prospectus.ownerId !== user.id)) return null;
    item.status = "reviewed";
    return item;
  });
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ interest: updated });
}
