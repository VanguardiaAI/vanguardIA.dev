import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vanguardia.com'),
  title: "VanguardIA - Agentes de IA que impulsan tu negocio",
  description: "Desarrollamos chatbots inteligentes, AI wrappers y aplicaciones de inteligencia artificial que automatizan procesos y convierten visitantes en clientes. Especialistas en soluciones de IA para empresas.",
  keywords: "IA, inteligencia artificial, chatbots, AI wrappers, automatización, desarrollo web, aplicaciones móviles, VanguardIA",
  authors: [{ name: "VanguardIA" }],
  creator: "VanguardIA",
  publisher: "VanguardIA",
  robots: "index, follow",
  openGraph: {
    title: "VanguardIA - Agentes de IA que impulsan tu negocio",
    description: "Desarrollamos chatbots inteligentes, AI wrappers y aplicaciones de inteligencia artificial que automatizan procesos y convierten visitantes en clientes.",
    type: "website",
    locale: "es_ES",
    siteName: "VanguardIA",
    images: [
      {
        url: "/logo.webp",
        width: 400,
        height: 400,
        alt: "VanguardIA Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VanguardIA - Agentes de IA que impulsan tu negocio",
    description: "Desarrollamos chatbots inteligentes, AI wrappers y aplicaciones de inteligencia artificial que automatizan procesos y convierten visitantes en clientes.",
    images: ["/logo.webp"],
  },
  icons: {
    icon: [
      { url: "/logo.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/logo.ico", sizes: "16x16", type: "image/x-icon" },
    ],
    apple: [
      { url: "/logo.webp", sizes: "180x180", type: "image/webp" },
    ],
    shortcut: "/logo.ico",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        <link rel="shortcut icon" href="/logo.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
