import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import styles from '@/styles/page.module.css';
import { Navbar } from '@/components/navbar/Navbar';

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
}>): React.JSX.Element {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} ${styles.wrapper}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
