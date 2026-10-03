import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Self-hosted variable fonts — no external requests at runtime. */
const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

const jetbrains = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-jetbrains",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const description =
  "DESA Menu replaces static QR menus with interactive text menus, cinematic dish videos, table-side games and built-in loyalty systems — elevating guest experience and increasing average order value.";

export const metadata: Metadata = {
  metadataBase: new URL("https://desamenu.com"),
  title: {
    default: "DESA Menu — Premium digital menu ecosystems for hospitality",
    template: "%s | DESA Menu",
  },
  description,
  applicationName: "DESA Menu",
  authors: [{ name: "DESA Agency" }],
  creator: "DESA Agency",
  keywords: [
    "digital menu",
    "video menu",
    "QR menu alternative",
    "restaurant technology",
    "hospitality software",
    "loyalty system",
    "table-side games",
    "DESA Menu",
  ],
  openGraph: {
    type: "website",
    title: "DESA Menu — Turn every menu into a premium digital experience",
    description,
    siteName: "DESA Menu",
    images: [
      {
        url: "/images/hero-dish.jpg",
        width: 1200,
        height: 1500,
        alt: "Fine-dining dish presented inside the DESA Menu digital experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DESA Menu — Turn every menu into a premium digital experience",
    description,
    images: ["/images/hero-dish.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveal animations are pure progressive enhancement.
            1. `js` unlocks the hidden pre-reveal state (so the content is
               always visible without JavaScript).
            2. `reveal-all` is a failsafe: if the bundle never hydrates
               (blocked asset, runtime error, offline chunk), everything is
               revealed instead of leaving a blank page.
            Set synchronously in <head> so it lands before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('js');" +
              "setTimeout(function(){if(!window.__desaRevealReady){d.classList.add('reveal-all');}},1200);" +
              "})();",
          }}
        />
      </head>
      <body className="bg-ink text-fg font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        {children}
        <div aria-hidden className="grain-layer" />
      </body>
    </html>
  );
}
