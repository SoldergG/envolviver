import type { Metadata } from "next";
import Image from "next/image";
import { getSite } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Arrow } from "@/components/Arrow";

export async function generateMetadata(): Promise<Metadata> {
  const { contacts } = await getSite();
  return {
    title: "Contactos",
    description: `Envolviver — ${contacts.address.join(", ")}. Telefone ${contacts.phone}.`,
  };
}

export default async function Page() {
  const { contacts } = await getSite();
  return (
    <>
      <section className="shell pb-14 pt-16 md:pt-24">
        <Reveal>
          <h1 className="text-hero balance max-w-[14ch]">Falemos.</h1>
          <p className="muted text-lead pretty mt-6 max-w-[46ch]">
            Diga-nos o contexto da sua escola e a nossa equipa faz um estudo
            prévio. Em poucos dias apresentamos uma proposta.
          </p>
        </Reveal>
      </section>

      <section className="shell pb-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-20">
          <Reveal>
            <ContactForm email={contacts.email} />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-10">
              <div>
                <h2 className="text-[0.9375rem] font-semibold">Morada</h2>
                <address className="muted mt-3 space-y-0.5 not-italic">
                  {contacts.address.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </address>
                <a
                  href={contacts.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow mt-4 text-[0.9375rem]"
                >
                  Ver no mapa <Arrow />
                </a>
              </div>

              <div>
                <h2 className="text-[0.9375rem] font-semibold">Direto</h2>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a
                      href={`tel:${contacts.phoneHref}`}
                      className="inline-flex min-h-[44px] items-center transition-opacity hover:opacity-60"
                    >
                      {contacts.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contacts.email}`}
                      className="inline-flex min-h-[44px] items-center transition-opacity hover:opacity-60"
                    >
                      {contacts.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-[0.9375rem] font-semibold">Como chegar</h2>
                <dl className="muted mt-3 space-y-3 text-[0.9375rem]">
                  {contacts.transport.map((t) => (
                    <div key={t.mode}>
                      <dt className="font-medium text-[var(--fg)]">{t.mode}</dt>
                      <dd>{t.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-24 md:pb-32">
        <Reveal>
          <a
            href={contacts.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="card block"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/8]">
              <Image
                src="/fotos/mapa.jpg"
                alt="Mapa com a localização da Envolviver em Algés"
                fill
                sizes="(max-width: 1120px) 100vw, 1120px"
                className="object-cover"
              />
            </div>
          </a>
        </Reveal>
      </section>
    </>
  );
}
