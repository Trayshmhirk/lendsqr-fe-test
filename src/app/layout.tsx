import type { Metadata } from "next";
import { Work_Sans, Roboto } from "next/font/google";
import "./globals.scss";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Lendsqr Admin Console",
  description: "Internal administrative management suite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${roboto.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
