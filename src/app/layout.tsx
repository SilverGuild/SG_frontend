import type { Metadata } from 'next'
import { beau_rivage, geistSans, geistMono } from './fonts'
import './globals.css'
import { Header } from '@/components'

export const metadata: Metadata = {
    title: 'SilverGuild',
    description: 'Dnd toolkit app, including: user profile, character sheets',
}

export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
       <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${beau_rivage.variable}`} >
            <body className={`antialiased overscroll-none`} >
                    <div className="flex flex-col w-full h-dvh">
                        <Header />
                        <main className="w-full flex-1 min-h-0 overflow-y-auto p-8">
                            {children}
                        </main>
                    </div>
            </body>
        </html>
    )
}
