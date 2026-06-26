import type { Metadata } from 'next'
import { beau_rivage, geistSans, geistMono } from './fonts'
import './globals.css'
import Header from '../components/layout/Header/header'
import { AppDataProvider } from '@/app/providers'
import { loadAppData } from '@/lib/server/loadAppData'

export const metadata: Metadata = {
    title: 'SilverGuild',
    description: 'Dnd toolkit app, including: user profile, character sheets',
}

export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    const userId = 1
    const { user, characters } = await loadAppData(userId)

    return (
       <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${beau_rivage.variable}`}
        >
            <body
                className={`antialiased overscroll-none`}
            >
                <AppDataProvider initialUser={user} initialCharacters={characters}> {/* Hard set for testing purposes */}
                    <div className="flex flex-col w-full min-h-screen">
                        <Header />
                        <main className="w-full p-6">
                            {children}
                        </main>
                    </div>
                </AppDataProvider>
            </body>
        </html>
    )
}
