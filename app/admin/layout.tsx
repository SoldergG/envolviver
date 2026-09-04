import type { ReactNode } from "react";
import Link from "next/link";
import { ClerkProvider, SignOutButton } from "@clerk/nextjs";
import { Ring } from "@/components/Logo";

/**
 * O painel corre fora do layout do site — sem a navegação pública
 * nem o rodapé, para não confundir o que é site e o que é edição.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <div className="min-h-screen surface">
        <div className="brand-rule" aria-hidden="true" />
        <header className="border-b rule">
          <div className="shell flex h-14 items-center justify-between gap-4">
            <Link href="/admin" className="inline-flex items-center gap-2.5">
              <Ring size={22} />
              <span className="font-semibold tracking-[-0.02em]">
                Envolviver <span className="muted font-normal">· administração</span>
              </span>
            </Link>
            <SignOutButton>
              <button
                type="button"
                className="muted min-h-[40px] rounded-lg px-3 text-[0.875rem] transition-colors hover:text-[var(--fg)]"
              >
                Sair
              </button>
            </SignOutButton>
          </div>
        </header>
        {children}
      </div>
    </ClerkProvider>
  );
}
