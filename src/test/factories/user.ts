import { User } from '@/types/user'

let nextUserId = 1

export function makeUser(overrides: Partial<User> = {}): User {
    const id = overrides.id ?? nextUserId++

    return {
        id,
        username: `testuser${id}`,
        email: `text${id}@example.com`,
        ...overrides,
    }
} 

export function makeUsers(count: number, overrides: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => makeUser(overrides))
}