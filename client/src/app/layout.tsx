import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import '../styles/globals.scss';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800", "900"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "SongBridge",
  description: "SongBridge is a music-sharing platform that enables musicians and listeners to create collaborative audio rooms. Users can upload tracks via files or URLs, build shared playlists without registration, and access music across regional restrictions - all through simple shareable links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
