import type { Metadata } from 'next'
import { beau_rivage, geistSans, geistMono } from './fonts'
import './globals.css'
import Header from '../components/layout/Header/header'
import { AppDataProvider } from '@/app/providers'

export const metadata: Metadata = {
    title: 'SilverGuild',
    description: 'Dnd toolkit app, including: user profile, character sheets',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${beau_rivage.variable} antialiased`}
            >
                <AppDataProvider userId={4}>
                    <div className="flex flex-col w-full h-screen">
                        <div className="top-0 left-0 w-full ">
                            <Header />
                        </div>
                        <main className="flex items-center justify-center w-full h-screen pt-40">
                            {children}
                        </main>
                    </div>
                </AppDataProvider>
            </body>
        </html>
    )
}
