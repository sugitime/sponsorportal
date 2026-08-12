export function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--bg)]">
        <span className="block h-2 w-2 rounded-full bg-current" />
      </span>
      <span className="text-[15px] font-medium tracking-[-0.03em]">SponsorPortal</span>
    </span>
  );
}
