import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div>
      <SiteHeader />
      <section className="page py-28">
        <p className="muted text-[13px] uppercase tracking-[0.2em]">404</p>
        <h1 className="display mt-4 max-w-2xl text-6xl">This page was never set.</h1>
        <p className="muted mt-5 max-w-md text-[16px] leading-7">
          The room you asked for is not in the house. Return to the studio or start again from Discover.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn">
            Home
          </Link>
          <Link href="/discover" className="btn btn-secondary">
            Discover
          </Link>
        </div>
      </section>
    </div>
  );
}
