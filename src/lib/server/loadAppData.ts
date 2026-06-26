import { fetchUser, fetchUserCharacters } from '@/lib/api/api'

export async function loadAppData(userId: number) {
    const [user, characters] = await Promise.all([ 
        fetchUser(userId),
        fetchUserCharacters(userId),
    ])
    return { user, characters }
}