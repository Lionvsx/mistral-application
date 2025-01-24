import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const font_sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const font_mono = localFont({
  src: "./fonts/CommitMono-Variable.woff2",
  variable: "--font-mono",
  adjustFontFallback: false,
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mistral AI",
  description: "Mistral AI chatbot for Leonard Roussard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font_sans.variable} ${font_mono.variable} antialiased font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
