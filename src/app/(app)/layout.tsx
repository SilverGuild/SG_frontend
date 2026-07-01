import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AppDataProvider } from "../providers"
import type { User, CharacterType } from "@/types"
import { fetchCurrentUser, fetchUserCharacters } from '@/lib/api/api'

export const dynamic = 'force-dynamic' // Temporary: auth's session dependency will make this intrinsic

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()
    
    let user: (User & { id: number }) | null = null
    let characters: CharacterType[] = []
    let backendUnreachable = false

    try {
        user = await fetchCurrentUser(cookieHeader)
        if (user) {
            characters = await fetchUserCharacters(user.id, cookieHeader)
        }
    } catch (err) {
        backendUnreachable = true
    }

    if (!backendUnreachable && !user) {
        redirect('/login')
    }

    return (
        <AppDataProvider initialUser={user} initialCharacters={characters}>
            { children }
        </AppDataProvider>
    )
}
