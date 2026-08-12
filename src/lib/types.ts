export type Role = "prospect" | "sponsor" | "admin";

export type ProspectusStatus =
  | "draft"
  | "completed"
  | "pending"
  | "published"
  | "archived";

export type PackageLevel =
  | "community"
  | "silver"
  | "gold"
  | "platinum"
  | "title"
  | "custom";

export type TemplateTone =
  | "editorial"
  | "summit"
  | "festival"
  | "civic"
  | "arena"
  | "noir";

export type AiAction =
  | "draft"
  | "rewrite"
  | "shorten"
  | "expand"
  | "professional"
  | "warm"
  | "bold"
  | "concise";

export type AiSection =
  | "overview"
  | "audience"
  | "demographics"
  | "benefits"
  | "callToAction"
  | "tagline"
  | "packageBenefit";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: Role;
  organization: string;
  location: string;
  industry: string;
  active: boolean;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  organization: string;
  location: string;
  industry: string;
  active: boolean;
  createdAt: string;
}

export interface SponsorshipPackage {
  id: string;
  name: string;
  price: string;
  level: PackageLevel;
  benefits: string[];
}

export interface Prospectus {
  id: string;
  slug: string;
  ownerId: string;
  templateId: string;
  status: ProspectusStatus;
  title: string;
  tagline: string;
  organization: string;
  industry: string;
  location: string;
  eventDate: string;
  audienceSize: string;
  overview: string;
  audience: string;
  demographics: string;
  benefits: string;
  packages: SponsorshipPackage[];
  callToAction: string;
  contactEmail: string;
  contactName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tone: TemplateTone;
  accent: string;
  paper: string;
  featured: boolean;
  active: boolean;
  defaults: Partial<
    Pick<
      Prospectus,
      | "title"
      | "tagline"
      | "overview"
      | "audience"
      | "demographics"
      | "benefits"
      | "callToAction"
      | "packages"
    >
  >;
}

export interface Interest {
  id: string;
  prospectusId: string;
  sponsorId: string;
  sponsorName: string;
  sponsorEmail: string;
  sponsorOrganization: string;
  message: string;
  status: "new" | "reviewed";
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  allowPublicSignup: boolean;
  requireModeration: boolean;
  supportEmail: string;
}

export interface Database {
  users: User[];
  templates: Template[];
  prospectuses: Prospectus[];
  interests: Interest[];
  settings: SiteSettings;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export const INDUSTRIES = [
  "Sports",
  "Arts & Culture",
  "Technology",
  "Nonprofit",
  "Music & Entertainment",
  "Education",
  "Food & Hospitality",
  "Environment",
  "Fashion",
  "Community",
] as const;

export const AUDIENCE_SIZES = [
  "Under 500",
  "500–2,000",
  "2,000–10,000",
  "10,000–50,000",
  "50,000+",
] as const;

export const PACKAGE_LEVELS: { value: PackageLevel; label: string }[] = [
  { value: "community", label: "Community" },
  { value: "silver", label: "Silver" },
  { value: "gold", label: "Gold" },
  { value: "platinum", label: "Platinum" },
  { value: "title", label: "Title" },
  { value: "custom", label: "Custom" },
];
