import { Dispatch, SetStateAction } from 'react'
import { CharacterType, CharacterInput, User } from './index'


export interface DataContextType {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    characters: CharacterType[]
    setCharacters: Dispatch<SetStateAction<CharacterType[]>>
    addCharacter: (input: CharacterInput) => Promise<CharacterType>
    updateCharacter: (id: number, changes: Partial<CharacterType>) => Promise<CharacterType>
    loading: boolean
}

export interface AppDataSeed {
    initialUser: User | null
    initialCharacters: CharacterType[]
}