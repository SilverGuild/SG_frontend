import { fetchUser, fetchUserCharacters } from '@/lib/api/api'

export async function loadAppData(userId: number, cookieHeader?: string) {
    const [user, characters] = await Promise.all([ 
        fetchUser(userId),
        fetchUserCharacters(userId, cookieHeader),
    ])
    return { user, characters }
}