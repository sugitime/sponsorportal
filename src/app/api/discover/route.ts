import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.toLowerCase() || "";
  const industry = url.searchParams.get("industry") || "";
  const audience = url.searchParams.get("audience") || "";
  const location = url.searchParams.get("location")?.toLowerCase() || "";
  const level = url.searchParams.get("level") || "";

  const db = await readDb();
  const items = db.prospectuses
    .filter((item) => item.status === "published")
    .filter((item) => {
      const hay = `${item.title} ${item.tagline} ${item.organization} ${item.overview} ${item.location}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (industry && item.industry !== industry) return false;
      if (audience && item.audienceSize !== audience) return false;
      if (location && !item.location.toLowerCase().includes(location)) return false;
      if (level && !item.packages.some((pkg) => pkg.level === level)) return false;
      return true;
    })
    .map((item) => ({
      ...item,
      template: db.templates.find((template) => template.id === item.templateId),
      interestCount: db.interests.filter((interest) => interest.prospectusId === item.id).length,
    }));

  return NextResponse.json({ prospectuses: items });
}
