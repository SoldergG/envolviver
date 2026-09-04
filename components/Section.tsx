import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="muted mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-display balance">{title}</h2>
      {lead && <p className="muted text-lead pretty mt-5">{lead}</p>}
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="muted text-lead pretty max-w-[68ch] space-y-6">{children}</div>
  );
}
