import { Dispatch, SetStateAction } from 'react'
import { Character, User } from './index'


export interface DataContextType {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    characters: Character[]
    setCharacters: Dispatch<SetStateAction<Character[]>>
    loading: boolean,
    isMockData: boolean
}