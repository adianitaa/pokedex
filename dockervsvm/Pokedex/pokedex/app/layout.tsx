import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import "@/lib/fontawesome";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pokédex App',
  description: 'A modern Pokédex app created with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <header className="bg-black p-4">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">
              <Link href="/">Pokédex</Link>
            </h1>
            <div>
              <Link href="/" className="text-white mr-4 hover:underline">
                Home
              </Link>
              <Link href="/favorites" className="text-white hover:underline">
                Favorites
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>

        <footer className="bg-black p-4 text-white text-center">
          <p>© 2025 Ariana. Frontend training</p>
        </footer>
      </body>
    </html>
  );
}
