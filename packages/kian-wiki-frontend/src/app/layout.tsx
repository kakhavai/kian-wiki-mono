import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

interface IFont {
  className: string;
  style: {
    fontFamily: string;
    fontWeight?: number;
    fontStyle?: string;
  };
}

const inter: IFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'kian.wiki',
  description: 'for fun',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
