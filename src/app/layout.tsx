import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL('https://willowcreekhoodoos.com'),
  other: {
    'theme-color': '#234d5c',
  },
};

// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}