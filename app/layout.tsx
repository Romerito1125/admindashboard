import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Administrador Dashboard Entrega Floral',
  description:
    'Entrega Floral.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
