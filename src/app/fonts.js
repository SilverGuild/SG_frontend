import { Kings, Geist, Geist_Mono, Beau_Rivage } from 'next/font/google';

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const beau_rivage = Beau_Rivage({
  subsets:['latin'],
  weight: ['400'],
  variable: '--font-beau-rivage',
  display: 'swap'
});