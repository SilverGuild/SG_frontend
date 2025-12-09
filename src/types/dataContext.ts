import { Character, User } from './index'

export interface DataContextType {
    user: User | null
    setUser: (user: User | null) => void
    characters: Character[]
    setCharacters: (characters: Character[]) => void
    loading: boolean
}