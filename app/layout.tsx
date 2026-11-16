
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Viral Clips",
  description: "Encuentra los mejores momentos de tus videos y crea clips virales."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
