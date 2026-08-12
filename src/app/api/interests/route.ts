import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireUser } from "@/lib/auth";
import { readDb, updateDb } from "@/lib/db";

export async function GET() {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  const db = await readDb();

  if (user.role === "sponsor") {
    const mine = db.interests
      .filter((item) => item.sponsorId === user.id)
      .map((item) => ({
        ...item,
        prospectus: db.prospectuses.find((entry) => entry.id === item.prospectusId),
      }));
    return NextResponse.json({ interests: mine });
  }

  const owned = new Set(
    db.prospectuses.filter((item) => item.ownerId === user.id || user.role === "admin").map((item) => item.id),
  );
  const incoming = db.interests
    .filter((item) => owned.has(item.prospectusId))
    .map((item) => ({
      ...item,
      prospectus: db.prospectuses.find((entry) => entry.id === item.prospectusId),
    }));
  return NextResponse.json({ interests: incoming });
}

export async function POST(request: Request) {
  const user = await requireUser(["sponsor", "admin"]);
  if (!user) {
    return NextResponse.json({ error: "Sign in as a sponsor to express interest." }, { status: 401 });
  }
  const body = (await request.json()) as { prospectusId?: string; message?: string };
  if (!body.prospectusId || !body.message?.trim()) {
    return NextResponse.json({ error: "A short note is required." }, { status: 400 });
  }

  const result = await updateDb((db) => {
    const prospectus = db.prospectuses.find(
      (item) => item.id === body.prospectusId && item.status === "published",
    );
    if (!prospectus) return { error: "That prospectus is not available." };
    const existing = db.interests.find(
      (item) => item.prospectusId === prospectus.id && item.sponsorId === user.id,
    );
    if (existing) return { error: "You have already written to this creator." };
    const interest = {
      id: randomUUID(),
      prospectusId: prospectus.id,
      sponsorId: user.id,
      sponsorName: user.name,
      sponsorEmail: user.email,
      sponsorOrganization: user.organization,
      message: body.message!.trim(),
      status: "new" as const,
      createdAt: new Date().toISOString(),
    };
    db.interests.unshift(interest);
    return { interest };
  });

  if ("error" in result) return NextResponse.json(result, { status: 400 });
  return NextResponse.json(result);
}
