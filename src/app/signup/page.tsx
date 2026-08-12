import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SignupForm } from "./ui";

export const metadata = { title: "Create an account" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  return (
    <div>
      <SiteHeader />
      <section className="page-narrow py-20">
        <p className="muted text-[13px] uppercase tracking-[0.2em]">Join the studio</p>
        <h1 className="display mt-4 text-5xl">Create an account.</h1>
        <p className="muted mt-4 text-[16px] leading-7">
          Creators write prospectuses. Sponsors discover them. You can change nothing
          essential later except the work.
        </p>
        <SignupForm initialRole={role === "sponsor" ? "sponsor" : "prospect"} />
        <p className="muted mt-8 text-[14px]">
          Already have a room?{" "}
          <Link href="/login" className="text-[var(--ink)] underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
