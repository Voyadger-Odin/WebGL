import localFont from 'next/font/local';

import type { Metadata } from 'next';

import './globals.css';

import { AppProvider } from '@/app/_providers/app-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const jetBrainsMono = localFont({
  src: './fonts/JetBrainsMono-Regular.woff2',
  variable: '--font-jetbrains-mono',
  weight: '100 900',
});
const SanFrancisco = localFont({
  // src: './fonts/SanFrancisco/SFUIText-Regular.woff',
  src: [
    {
      path: './fonts/SanFrancisco/SFUIDisplay-Thin.woff',
      weight: '100',
    },
    {
      path: './fonts/SanFrancisco/SFUIDisplay-Ultralight.woff',
      weight: '200',
    },
    {
      path: './fonts/SanFrancisco/SFUIText-Light.woff',
      weight: '300',
    },
    {
      path: './fonts/SanFrancisco/SFUIText-Regular.woff',
      weight: '400',
    },
    {
      path: './fonts/SanFrancisco/SFUIText-Medium.woff',
      weight: '500',
    },
    {
      path: './fonts/SanFrancisco/SFUIText-Semibold.woff',
      weight: '600',
    },
    {
      path: './fonts/SanFrancisco/SFUIText-Bold.woff',
      weight: '700',
    },
    {
      path: './fonts/SanFrancisco/SFUIText-Heavy.woff',
      weight: '800',
    },
    {
      path: './fonts/SanFrancisco/SFUIDisplay-Black.woff',
      weight: '900',
    },
  ],
  variable: '--font-sanfrancisco',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Animations plate',
  description: 'Sandbox for shader animations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SanFrancisco.variable} ${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
