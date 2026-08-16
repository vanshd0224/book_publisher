import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Essentials of Medical Device Clinical Research - 3 Volume Book Set',
  description: 'Authoritative 3-volume hardcover book set by Dr. Ashish Indani for medical device clinical research, ISO 14155, FDA, EU MDR, and Indian regulatory compliance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
