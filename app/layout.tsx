import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mapepa",
  description: "Get all examination pastpapers in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative flex flex-col justify-between split-background min-h-screen max-w-screen-xl mx-auto`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
