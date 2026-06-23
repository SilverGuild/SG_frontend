import { SG_API_BASE_URL, SG_API_ENDPOINTS } from './config'
import { User, CharacterType } from '@/types'
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

export async function fetchUserCharacters(id: number): Promise<CharacterType[]> {
    const json = await apiRequest<JsonApiResponse<CharacterType>>(SG_API_ENDPOINTS.charactersByUserId(id))
    return extractAll<CharacterType>(json)
}

export async function fetchCharacter(id: number): Promise<CharacterType> {
    const json = await apiRequest<JsonApiResponse<CharacterType>>(SG_API_ENDPOINTS.characterById(id))
    return extractSingle<CharacterType>(json)
}

export async function createCharacter(id: number, input: CharacterType): Promise<CharacterType> {
    const json = await apiRequest<JsonApiResponse<CharacterType>>(
        SG_API_ENDPOINTS.charactersByUserId(id),
        {
            method: 'POST',
            body: JSON.stringify({ character: input }),
        },
    )
    return extractSingle<CharacterType>(json)
}

export async function updateCharacter(id: number, changes: Partial<CharacterType>): Promise<CharacterType> {
    const json = await apiRequest<JsonApiResponse<CharacterType>>(
        SG_API_ENDPOINTS.characterById(id),
        {
            method: 'PATCH',
            body: JSON.stringify({ character: changes }),
        },
    )
    return extractSingle<CharacterType>(json)
}