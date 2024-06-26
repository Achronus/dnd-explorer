import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DnD 5e Explorer | Achronus",
  description:
    "Find spells, monsters and classes with ease using our interactive explorer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} min-h-screen flex flex-col`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
