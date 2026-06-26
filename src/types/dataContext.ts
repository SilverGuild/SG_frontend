import { Dispatch, SetStateAction } from 'react'
import { CharacterType, CharacterInput, User } from './index'


export interface DataContextType {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    characters: CharacterType[]
    setCharacters: Dispatch<SetStateAction<CharacterType[]>>
    addCharacter: (input: CharacterInput) => Promise<CharacterType>
    loading: boolean,
    isMockData: boolean
}

export interface AppDataSeed {
    initialUser: User | null
    initialCharacters: CharacterType[]
}