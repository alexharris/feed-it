import localFont from "next/font/local";
import Link from 'next/link'
import "./globals.css";
import HeaderUser from '@/app/components/headerUser';

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

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-4 uppercase text-lg flex flex-row justify-between">
        <Link href="/">Feedbag</Link>
        <HeaderUser />

        </header>
        {children}

      </body>
    </html>
  );
}
