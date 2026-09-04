import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CataLink — Tu catálogo, tus ventas",
  description:
    "Convierte cualquier catálogo en un link interactivo. Tus clientes piden, tú vendes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
