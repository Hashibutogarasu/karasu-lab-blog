import type { Metadata } from "next";
import localFont from "next/font/local";
import AppAppBar from "@/components/AppAppBar";
import './page.module.css';
import Footer from "@/components/Footer";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import NextAuthProvider from "@/providers/NextAuth";
import { Box } from "@mui/material";
import { ClientWrapper } from "@/components/ClientWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Karasu Lab",
  description: "This is my awesome website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <NextAuthProvider>
            <AppAppBar />
            <ClientWrapper>{children}</ClientWrapper>
            <Footer />
          </NextAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
