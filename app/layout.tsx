import type { Metadata } from "next";
import { headers } from "next/headers";
import { CartProvider } from "./components/CartProvider";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = `${protocol}://${host}`;
  return {
    metadataBase: new URL(base),
    title: { default: "Brutos Store — Perfumes e Pomadas Masculinas", template: "%s | Brutos Store" },
    description: "212, 1 Million, perfumes árabes e produtos masculinos Macho-Lândia e Jaboque na Brutos Barbearia em Jataí.",
    keywords: ["perfume masculino", "212 VIP Black", "1 Million", "perfume árabe", "pomada masculina", "Macholândia", "Jaboque", "barbearia Jataí"],
    openGraph: { title: "Brutos Store — Perfumes e Pomadas Masculinas", description: "212, 1 Million, perfumes árabes e pomadas masculinas com a identidade Brutos.", type: "website", locale: "pt_BR", images: [`${base}/og.png`] },
    twitter: { card: "summary_large_image", title: "Brutos Store — Perfumes e Pomadas", description: "Cheiro de presença. Estilo de homem.", images: [`${base}/og.png`] },
    icons: { icon: "/brutos-logo.jpg", shortcut: "/brutos-logo.jpg", apple: "/brutos-logo.jpg" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><CartProvider>{children}</CartProvider></body></html>;
}
