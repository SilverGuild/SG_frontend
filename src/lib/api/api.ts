import { SG_API_BASE_URL, SG_API_ENDPOINTS } from './config'
import { User, CharacterType, CharacterInput } from '@/types'
import { JsonApiResponse, extractSingle, extractAll } from './jsonApiClient'
import { isStatusError } from './errors'

export async function apiRequest<T>(
    endpoint: string, 
    options?: RequestInit, 
    cookieHeader?: string
): Promise<T> {
    const response = await fetch(`${SG_API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            ...options?.headers,
        },
    })

    if (!response.ok) {
        const error = new Error(`API ERROR: ${response.statusText}`) as Error & { status?: number }
        error.status = response.status
        throw error
    }

    return response.json()
}

export async function login(username: string, password: string): Promise<User> {
    const json = await apiRequest<JsonApiResponse<User>>(
        SG_API_ENDPOINTS.login(),
        {
            method: 'POST',
            body: JSON.stringify({ session: { username, password }}),
        },
    )
    return extractSingle<User>(json)
}


export async function fetchUser(id: number, cookieHeader?: string): Promise<User> {
    const json = await apiRequest<JsonApiResponse<User>>(
        SG_API_ENDPOINTS.userById(id),
        undefined,
        cookieHeader,
    )
    return extractSingle<User>(json)
}

export async function fetchCurrentUser(cookieHeader?: string): Promise<(User & { id: number }) | null> {
    try {
        const json = await apiRequest<JsonApiResponse<User>>(
            SG_API_ENDPOINTS.current(),
            undefined,
            cookieHeader,
        )
        return extractSingle<User>(json)
    } catch (err) {
        if (isStatusError(err) && err.status === 401) {
            return null
        }
        throw err
    }
}

export async function fetchUserCharacters(id: number, cookieHeader?: string): Promise<CharacterType[]> {
    const json = await apiRequest<JsonApiResponse<CharacterType>>(
        SG_API_ENDPOINTS.charactersByUserId(id),
        undefined,
        cookieHeader
    )

    return extractAll<CharacterType>(json)
}

export async function fetchCharacter(id: number): Promise<CharacterType> {
    const json = await apiRequest<JsonApiResponse<CharacterType>>(SG_API_ENDPOINTS.characterById(id))
    return extractSingle<CharacterType>(json)
}

export async function createCharacter(id: number, input: CharacterInput): Promise<CharacterType> {
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

