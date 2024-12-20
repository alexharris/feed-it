import localFont from "next/font/local";
import Link from 'next/link'
import "./globals.css";
import HeaderUser from '@/app/components/headerUser';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Feed Computer</title>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />  
        <script src="https://cdn.usefathom.com/script.js" data-site="GFAWZHOT" defer></script>
      </head>
      <body className="h-screen">

        <div className="flex flex-col h-full">
          <header className="p-4 text-lg flex flex-row justify-between items-center border-b border-gray-200 sticky top-0 z-50 bg-white">
            <Link href="/" className="thermo text-xl">Feed.Computer</Link>
            <HeaderUser />
          </header>
          {children}
          <footer className="py-16 text-center" >
            {/*  */}
            <form
              action="https://buttondown.com/api/emails/embed-subscribe/alexharris"
              method="post"
              target="popupwindow"
              onsubmit="window.open('https://buttondown.com/alexharris', 'popupwindow')"
              className="embeddable-buttondown-form flex flex-col items-center gap-2"
            >
              <label for="bd-email">Feed.Computer is in progress. Sign up if you want (very infrequent) updates.</label>
              <input type="email" name="email" id="bd-email" />
              
              <input className="button" type="submit" value="Subscribe" />

            </form>            
          </footer>
        </div>
      </body>
    </html>
  );
}
