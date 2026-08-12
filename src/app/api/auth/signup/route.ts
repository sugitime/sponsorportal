import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { readDb, updateDb } from "@/lib/db";
import { hashPassword, setSessionCookie, signSession } from "@/lib/auth";
import type { Role } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    name?: string;
    organization?: string;
    role?: Role;
  };

  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim();
  const password = body.password || "";
  const role: Role = body.role === "sponsor" ? "sponsor" : "prospect";

  if (!email || !name || password.length < 8) {
    return NextResponse.json(
      { error: "Name, email, and a password of at least 8 characters are required." },
      { status: 400 },
    );
  }

  const existing = await readDb();
  if (!existing.settings.allowPublicSignup) {
    return NextResponse.json({ error: "New accounts are not being accepted." }, { status: 403 });
  }
  if (existing.users.some((user) => user.email === email)) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const user = await updateDb(async (db) => {
    const created = {
      id: randomUUID(),
      email,
      name,
      passwordHash: await hashPassword(password),
      role,
      organization: body.organization?.trim() || "",
      location: "",
      industry: "",
      active: true,
      createdAt: new Date().toISOString(),
    };
    db.users.push(created);
    return created;
  });

  const token = await signSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  await setSessionCookie(token);
  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
}
