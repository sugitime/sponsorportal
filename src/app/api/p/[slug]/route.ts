import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  const db = await readDb();
  const prospectus = db.prospectuses.find(
    (item) => item.slug === slug && (item.status === "published" || item.status === "pending"),
  );
  if (!prospectus || prospectus.status !== "published") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({
    prospectus,
    template: db.templates.find((item) => item.id === prospectus.templateId),
  });
}
