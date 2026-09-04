import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/* Inter serve de reserva para quem não está em Apple —
   nos dispositivos Apple o stack em globals.css usa SF Pro nativo. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const site = "https://envolviver.pt";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Envolviver — atividades pedagógicas e apoio à família",
    template: "%s — Envolviver",
  },
  description:
    "Associação que desenvolve atividades de enriquecimento curricular, acolhimento matinal e prolongamento de horário para crianças e jovens. Algés, Portugal.",
  keywords: [
    "AEC", "CAF", "AAAF", "enriquecimento curricular",
    "apoio à família", "prolongamento de horário", "Algés",
  ],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: site,
    siteName: "Envolviver",
    title: "Envolviver — atividades pedagógicas e apoio à família",
    description:
      "Atividades de enriquecimento curricular e componente de apoio à família para escolas e jardins de infância.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Envolviver",
    description: "Atividades pedagógicas e apoio à família.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={inter.variable}>
      <body>
        {/* Corre antes da pintura — sem isto, o CSS deixa o conteúdo
            visível e a animação de entrada simplesmente não acontece. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--fg)] focus:px-4 focus:py-3 focus:text-[var(--shell)]"
        >
          Saltar para o conteúdo
        </a>
        <Nav />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
