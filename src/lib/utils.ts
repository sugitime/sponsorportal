export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  const base = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return base || "prospectus";
}

export function uniqueSlug(title: string, existing: string[]) {
  const base = slugify(title);
  if (!existing.includes(base)) return base;
  let i = 2;
  while (existing.includes(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}

export function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatCompactDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function timeAgo(value: string) {
  const delta = Date.now() - new Date(value).getTime();
  const minutes = Math.round(delta / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 14) return `${days}d ago`;
  return formatCompactDate(value);
}

export function audienceRank(size: string) {
  const order = [
    "Under 500",
    "500–2,000",
    "2,000–10,000",
    "10,000–50,000",
    "50,000+",
  ];
  return order.indexOf(size);
}

export function completionScore(input: {
  title: string;
  tagline: string;
  overview: string;
  audience: string;
  demographics: string;
  benefits: string;
  callToAction: string;
  packages: { name: string; price: string }[];
}) {
  const checks = [
    input.title.trim().length > 2,
    input.tagline.trim().length > 8,
    input.overview.trim().length > 40,
    input.audience.trim().length > 20,
    input.demographics.trim().length > 20,
    input.benefits.trim().length > 20,
    input.callToAction.trim().length > 12,
    input.packages.some((item) => item.name && item.price),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function publicUser<T extends { passwordHash: string }>(user: T) {
  const { passwordHash: _passwordHash, ...rest } = user;
  void _passwordHash;
  return rest;
}
