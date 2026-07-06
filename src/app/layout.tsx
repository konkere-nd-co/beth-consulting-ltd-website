import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SiteEnhancements } from "../components/SiteEnhancements";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bethconsultingltd.com"),
  title: "Beth Consulting Limited | Operational Structure and System Advisory",
  description:
    "Beth Consulting Limited helps women-led organisations, founders and growing teams move from operational pressure to structured systems that improve coordination, decision making and team performance.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Beth Consulting Limited",
    title:
      "Beth Consulting Limited | Operational Structure and System Advisory",
    description:
      "Operational structure and systems advisory for women-led organisations, founders and growing teams.",
    url: "https://www.bethconsultingltd.com/",
    images: ["/assets/images/bcl-logo.png"],
  },
  twitter: {
    card: "summary",
    title:
      "Beth Consulting Limited | Operational Structure and System Advisory",
    description:
      "Operational structure and systems advisory for women-led organisations, founders and growing teams.",
    images: ["/assets/images/bcl-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/assets/images/bcl-logo.png" />
        <meta name="theme-color" content="#3B5145" />
      </head>
      <body>
        <Script src="/assets/js/config.js" strategy="beforeInteractive" />
        <Script
          src="https://assets.mailerlite.com/js/universal.js"
          strategy="afterInteractive"
        />
        <Script id="mailerlite-init" strategy="afterInteractive">
          {`(function () { if (window.ml) { window.ml('account', '2492537'); } })();`}
        </Script>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <SiteEnhancements />
        {children}
        <Footer />
      </body>
    </html>
  );
}
