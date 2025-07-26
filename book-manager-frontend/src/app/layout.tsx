// src/app/layout.tsx

import '../../styles/global.css'; // ✅ Fix path based on your file structure
import { ReactNode } from 'react';

export const metadata = {
  title: 'Book Manager',
  description: 'Manage your book collection',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
