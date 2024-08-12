import type { Metadata } from 'next';
import Nav from './_components/nav';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Batch Clip',
  description: 'Batch Clip',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
