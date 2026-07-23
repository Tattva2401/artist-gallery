import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

// Metadata
export const metadata: Metadata = {
  title: "Kavita Rajput Studio | Original Art & Prints",
  description: "Explore and commission original contemporary artworks by Kavita Rajput.",
};

// Main Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-zinc-50 min-h-screen flex flex-col`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}