import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './provider';
import { SessionProvider } from '@/providers/sessionProvider';
import AppProvider from './_app';
import { ThemeProvider } from '@/components/ThemeProvider';

import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Marketly for vendors',
    template: '%s | Marketly for vendors',
  },
  description: 'Marketly vendors platform for vendors to manage their stores',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <SessionProvider>
              <AppProvider>
                <div className="flex w-full bg-background min-h-screen items-center justify-center">
                  {children}
                  <Toaster />
                </div>
              </AppProvider>
            </SessionProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
