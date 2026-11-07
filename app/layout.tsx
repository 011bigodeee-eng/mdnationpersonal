import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
const displayFont = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-800-italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});
const bodyFont = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});
const site = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: "MD Nation | Matheus Dias — Sua evolução começa com uma decisão",
  description:
    "Conheça a MD Nation e Matheus Dias. Estratégia, disciplina e atenção à sua jornada de treinamento. Explore a prévia e conte seu objetivo.",
  ...(site
    ? { metadataBase: new URL(site), alternates: { canonical: "/" } }
    : { robots: { index: false, follow: false } }),
  openGraph: {
    title: "MD Nation | Matheus Dias",
    description: "Sua evolução começa com uma decisão.",
    locale: "pt_BR",
    type: "website",
    ...(site
      ? {
          images: [
            {
              url: "/images/gym.webp",
              width: 1536,
              height: 1024,
              alt: "Equipamentos em uma academia com iluminação vermelha. Imagem ilustrativa.",
            },
          ],
        }
      : {}),
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.mdIntroStarted=String(performance.now());try{if(sessionStorage.getItem('md-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.mdIntro='skip'}catch{}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
