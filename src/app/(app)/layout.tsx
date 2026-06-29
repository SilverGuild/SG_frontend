import App from "next/app"
import { AppDataProvider } from "../providers"
import { loadAppData } from "@/lib/server/loadAppData"

export const dynamic = 'force-dynamic' // Temporary: auth's session dependency will make this intrinsic

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const userId = 1 // Temporary: stand-in for the session user
    const { user, characters } = await loadAppData(userId)

    return (
        <AppDataProvider initialUser={user} initialCharacters={characters}>
            { children }
        </AppDataProvider>
    )
}
