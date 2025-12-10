import { SG_API_BASE_URL, SG_API_ENDPOINTS } from './config'
import { User, Character } from '@/types'
import { JsonApiResponse, extractSingle, extractAll } from './jsonApiClient'

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${SG_API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    })

    if (!response.ok) {
        throw new Error(`API ERROR: ${response.statusText}`)
    }

    return response.json()
}

export async function fetchUser(id: number): Promise<User> {
    const json = await apiRequest<JsonApiResponse<User>>(SG_API_ENDPOINTS.userById(id))
    return extractSingle<User>(json)
}

export async function fetchUserCharacters(id: number): Promise<Character[]> {
    const json = await apiRequest<JsonApiResponse<Character>>(SG_API_ENDPOINTS.charactersByUserId(id))
    return extractAll<Character>(json)
}