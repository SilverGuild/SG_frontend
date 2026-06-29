import { AppDataProvider } from "../providers"
import { loadAppData } from "@/lib/server/loadAppData"
import type { User, CharacterType } from "@/types"

export const dynamic = 'force-dynamic' // Temporary: auth's session dependency will make this intrinsic

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const userId = 1 // Temporary: stand-in for the session user

    let user: User | null = null
    let characters: CharacterType[] = []

    try {
        const data = await loadAppData(userId)
        user = data.user
        characters = data.characters
    } catch (err) {
        console.log('loadAppData failed; rendering with empty data:', err)
    }

    return (
        <AppDataProvider initialUser={user} initialCharacters={characters}>
            { children }
        </AppDataProvider>
    )
}
