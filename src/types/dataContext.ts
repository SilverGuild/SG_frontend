import { Dispatch, SetStateAction } from 'react'
import { CharacterType, User } from './index'


export interface DataContextType {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    characters: CharacterType[]
    setCharacters: Dispatch<SetStateAction<CharacterType[]>>
    loading: boolean,
    isMockData: boolean
}