import { inter } from '@/src/ui/fonts';
import '@/src/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
