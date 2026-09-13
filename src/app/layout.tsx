import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AngeLinks — Tu catálogo, tus ventas",
  description:
    "Convierte cualquier catálogo de belleza en un link interactivo. Tus clientes piden, tú vendes. AngeLinks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-warm-100 text-warm-700">
        {children}
      </body>
    </html>
  );
}
