import React from 'react';
import localFont from 'next/font/local';

import { AppProvider } from '../src/app/_providers/app-provider';

import type { ReactNode } from 'react';

import '../src/app/globals.css';

import { cn } from '../src/shared/lib/utils'; // replace with the name of your tailwind css file

// Monserrat font is still used from https://fonts.google.com/specimen/Montserrat
// See the preview-head.html for more details
// Reference: https://dev.to/timreach/using-fonts-in-storybook-for-nextjs-and-tailwind-projects-4f1p

const fontSans = localFont({
  src: [
    { path: '../public/fonts/montserrat/montserrat.ttf' },
    { path: '../public/fonts/montserrat/montserrat.woff2' },
  ],
  variable: '--font-sans',
});

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <main
        className={cn('min-h-screen min-w-80 font-sans antialiased', fontSans.variable)}
      >
        {children}
      </main>
    </AppProvider>
  );
}

export const decorators = [(renderStory: any) => <Wrapper>{renderStory()} </Wrapper>];
