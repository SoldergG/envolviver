import Link from "next/link";
import { external } from "@/lib/content";
import { getSite } from "@/lib/site";
import { Ring } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

function buildColumns(aec: Awaited<ReturnType<typeof getSite>>["aec"], caf: Awaited<ReturnType<typeof getSite>>["caf"]) {
  return [
  {
    title: "A Envolviver",
    links: [
      { label: "Quem somos", href: "/a-envolviver#quem-somos" },
      { label: "Os nossos objetivos", href: "/a-envolviver#objetivos" },
      { label: "Como fazemos", href: "/a-envolviver#como-fazemos" },
    ],
  },
  {
    title: "Enriquecimento Curricular",
    links: aec.activities.map((a) => ({
      label: a.name,
      href: `/enriquecimento-curricular/${a.slug}`,
    })),
  },
  {
    title: "Apoio à Família",
    links: caf.activities.map((a) => ({
      label: a.name,
      href: `/apoio-a-familia/${a.slug}`,
    })),
  },
  {
    title: "Mais",
    links: [
      { label: "Férias e Interrupções", href: "/ferias-e-interrupcoes" },
      { label: "Notícias", href: "/noticias" },
      { label: "Contactos", href: "/contactos" },
    ],
  },
  ];
}

export async function Footer() {
  const { aec, caf, contacts } = await getSite();
  const columns = buildColumns(aec, caf);
  return (
    <footer className="surface-2 border-t rule">
      <div className="brand-rule" aria-hidden="true" />
      <div className="shell py-16 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-[0.8125rem] font-semibold tracking-[-0.01em]">
                {col.title}
              </h2>
              <ul className="mt-1 sm:mt-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="muted inline-flex min-h-[44px] items-center text-[0.8125rem] transition-colors hover:text-[var(--fg)] sm:min-h-[28px]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t rule pt-8 sm:grid-cols-2">
          <div>
            <h2 className="text-[0.8125rem] font-semibold">Contactos</h2>
            <address className="muted mt-3 space-y-1 text-[0.8125rem] not-italic">
              {contacts.address.map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div className="pt-2">
                <a
                  href={`tel:${contacts.phoneHref}`}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--fg)] sm:min-h-[28px]"
                >
                  {contacts.phone}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${contacts.email}`}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--fg)] sm:min-h-[28px]"
                >
                  {contacts.email}
                </a>
              </div>
            </address>
          </div>

          <div className="sm:text-right">
            <h2 className="text-[0.8125rem] font-semibold">Acessos</h2>
            <ul className="muted mt-1 text-[0.8125rem] sm:mt-3">
              <li>
                <a href={external.recrutamento} className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--fg)] sm:min-h-[28px]">
                  Recrutamento
                </a>
              </li>
              <li>
                <a href={external.areaReservada} className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--fg)] sm:min-h-[28px]">
                  Área reservada
                </a>
              </li>
              <li>
                <a href={external.areaEncEducacao} className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--fg)] sm:min-h-[28px]">
                  Área do encarregado de educação
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[0.8125rem] font-semibold">Aspeto</h2>
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </div>
          <p className="muted max-w-[34ch] text-[0.75rem] sm:text-right">
            O site abre em claro. Escolha Sistema para acompanhar o seu
            dispositivo.
          </p>
        </div>

        <div className="muted mt-10 flex flex-col gap-4 border-t rule pt-8 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2">
            <Ring size={16} />
            © {new Date().getFullYear()} Envolviver. Todos os direitos reservados.
          </span>
          <span>Algés, Portugal</span>
        </div>
      </div>
    </footer>
  );
}
