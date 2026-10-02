import type { Metadata } from "next";
import AuthProvider from "@/components/auth/AuthProvider";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://angelinks-app.netlify.app";

export const metadata: Metadata = {
  title: "AngeLinks — Tu catálogo, tus ventas",
  description:
    "Convierte cualquier catálogo de belleza en un link interactivo. Tus clientes piden, tú vendes. AngeLinks.",
  metadataBase: new URL(appUrl),
  openGraph: {
    title: "AngeLinks — Tu catálogo, tus ventas",
    description:
      "Convierte cualquier catálogo de belleza en un link interactivo. Tus clientes piden, tú vendes.",
    url: appUrl,
    siteName: "AngeLinks",
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: "AngeLinks",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AngeLinks — Tu catálogo, tus ventas",
    description:
      "Convierte cualquier catálogo de belleza en un link interactivo.",
    images: ["/logo-512.png"],
  },
  icons: {
    icon: [
      { url: "/logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/logo-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-warm-100 text-warm-700">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
