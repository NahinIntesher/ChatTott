import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ThemeProviders from "@/componets/ThemeProvider";

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
