import Link from "next/link";
import { Arrow } from "@/components/Arrow";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="muted text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
        404
      </p>
      <h1 className="text-display balance mt-4 max-w-[18ch]">
        Não encontrámos esta página.
      </h1>
      <Link href="/" className="btn btn-fill mt-9">
        Voltar ao início <Arrow />
      </Link>
    </section>
  );
}
