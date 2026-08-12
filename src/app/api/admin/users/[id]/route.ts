import { NextResponse } from "next/server";
import { requireUser, toPublicUser } from "@/lib/auth";
import { updateDb } from "@/lib/db";
import type { Role } from "@/lib/types";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const { id } = await ctx.params;
  const body = (await request.json()) as { role?: Role; active?: boolean; name?: string };

  const updated = await updateDb((db) => {
    const user = db.users.find((item) => item.id === id);
    if (!user) return null;
    if (user.id === admin.id && body.active === false) {
      throw new Error("You cannot deactivate your own account.");
    }
    if (body.role) user.role = body.role;
    if (typeof body.active === "boolean") user.active = body.active;
    if (body.name) user.name = body.name;
    return user;
  }).catch((error: Error) => ({ error: error.message }));

  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if ("error" in updated) return NextResponse.json(updated, { status: 400 });
  return NextResponse.json({ user: toPublicUser(updated) });
}
