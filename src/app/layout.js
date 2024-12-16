import localFont from "next/font/local";
import Link from 'next/link'
import "./globals.css";
import HeaderUser from '@/app/components/headerUser';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />        
      </head>
      <body>
        <header className="p-4 text-lg flex flex-row justify-between items-center border-b border-gray-200">
          <Link href="/" className="thermo text-xl">Feed.Computer</Link>
          <HeaderUser />
        </header>
        {children}
      </body>
    </html>
  );
}
