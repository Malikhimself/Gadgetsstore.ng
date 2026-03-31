import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gadgets Store",
  description: "Your one-stop shop for all things tech",
};

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { MaintenanceGate } from "@/components/MaintenanceGate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <MaintenanceGate>
              {children}
            </MaintenanceGate>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
