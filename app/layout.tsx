import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineBook - Your Ultimate Movie Booking Experience",

  
  description: "Book movie tickets, find showtimes, and explore cinemas near you with CineBook. Your ultimate destination for seamless movie booking in India.",

    keywords: [
    "movie booking",
    "cinema tickets",
    "showtimes",
    "theaters near me",
    "Bollywood movies",
    "South Indian movies",
    "online movie tickets",
    "CineBook",
    "India movies"
  ],

  icons: {
    icon: '/favicon.png',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
