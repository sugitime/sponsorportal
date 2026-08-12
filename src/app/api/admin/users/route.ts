import { NextResponse } from "next/server";
import { requireUser, toPublicUser } from "@/lib/auth";
import { readDb } from "@/lib/db";

export async function GET() {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const db = await readDb();
  return NextResponse.json({ users: db.users.map(toPublicUser) });
}
