import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { readDb } from "@/lib/db";

export async function GET() {
  const admin = await requireUser(["admin"]);
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const db = await readDb();

  return NextResponse.json({
    users: db.users.length,
    activeUsers: db.users.filter((user) => user.active).length,
    prospects: db.users.filter((user) => user.role === "prospect").length,
    sponsors: db.users.filter((user) => user.role === "sponsor").length,
    prospectuses: db.prospectuses.length,
    published: db.prospectuses.filter((item) => item.status === "published").length,
    drafts: db.prospectuses.filter((item) => item.status === "draft").length,
    pending: db.prospectuses.filter((item) => item.status === "pending").length,
    interests: db.interests.length,
    recentUsers: [...db.users].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6),
    recentInterests: db.interests.slice(0, 6),
  });
}
