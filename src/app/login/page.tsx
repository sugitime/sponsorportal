import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { LoginForm } from "./ui";

export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <div>
      <SiteHeader />
      <section className="page-narrow py-20">
        <p className="muted text-[13px] uppercase tracking-[0.2em]">Welcome back</p>
        <h1 className="display mt-4 text-5xl">Sign in.</h1>
        <p className="muted mt-4 text-[16px] leading-7">
          Use a studio account, or one of the demonstration rooms below.
        </p>
        <LoginForm nextPath={next || ""} />
        <p className="muted mt-8 text-[14px]">
          New here?{" "}
          <Link href="/signup" className="text-[var(--ink)] underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </section>
    </div>
  );
}
