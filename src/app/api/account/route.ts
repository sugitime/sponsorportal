import { NextResponse } from "next/server";
import { getCurrentUser, toPublicUser } from "@/lib/auth";
import { updateDb } from "@/lib/db";

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const body = (await request.json()) as {
    name?: string;
    organization?: string;
    location?: string;
    industry?: string;
  };

  const updated = await updateDb((db) => {
    const item = db.users.find((entry) => entry.id === user.id);
    if (!item) return null;
    if (body.name) item.name = body.name;
    if (typeof body.organization === "string") item.organization = body.organization;
    if (typeof body.location === "string") item.location = body.location;
    if (typeof body.industry === "string") item.industry = body.industry;
    return item;
  });
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ user: toPublicUser(updated) });
}
