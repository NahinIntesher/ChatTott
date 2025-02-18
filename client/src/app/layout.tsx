import type { Metadata } from "next";
import localFont from "next/font/local";
import ThemeProviders from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = localFont({
  src: "../../public/fonts/Quicksand-Regular.ttf",
  variable: "--font-quicksand",
  weight: "400 900",
});

export const metadata: Metadata = {
  title: "ChatTott",
  description: "A Real-Time Chat App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/ChatTottLogo.png" type="image/png" />
      </head>
      <body>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
