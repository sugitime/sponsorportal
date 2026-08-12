import Link from "next/link";

export function EmptyState({
  title,
  body,
  action,
  href,
}: {
  title: string;
  body: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="surface px-8 py-16 text-center">
      <div className="mx-auto mb-6 h-12 w-12 rounded-full border border-[var(--line)]" />
      <h3 className="display text-2xl">{title}</h3>
      <p className="muted mx-auto mt-3 max-w-md text-[15px] leading-7">{body}</p>
      {action && href && (
        <Link href={href} className="btn mt-8">
          {action}
        </Link>
      )}
    </div>
  );
}
