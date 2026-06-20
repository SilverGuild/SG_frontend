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
       <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${beau_rivage.variable}`}
        >
            <body
                className={"antialiased"}
            >
                <AppDataProvider userId={7}> {/* Hard set for testing purposes */}
                    <div className="flex flex-col w-full min-h-screen">
                        <Header />
                        <main className="flex flex-1 items-center justify-center w-full">
                            {children}
                        </main>
                    </div>
                </AppDataProvider>
            </body>
        </html>
    )
}
