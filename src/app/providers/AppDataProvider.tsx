'use client'

import { useState, ReactNode } from 'react'
import {useRouter } from 'next/navigation'
import { DataContextProvider } from '@/app/providers'
import { createCharacter as apiCreateCharacter} from '@/lib/api/api'
import { User, CharacterType, CharacterInput, AppDataSeed } from '@/types'



interface AppDataProviderProps extends AppDataSeed {
    children: ReactNode
}

export function AppDataProvider({ children, initialUser, initialCharacters } : AppDataProviderProps) {
    const [ user, setUser ] = useState(initialUser)
    const [ characters, setCharacters ] = useState<CharacterType[]>(initialCharacters)
    const router = useRouter()

    async function addCharacter(input: CharacterInput): Promise<CharacterType> {
        if (!user) throw new Error('Cannot create a character without a user')
        const created = await apiCreateCharacter(user.id, input)
    setCharacters((prev) => [...prev, created])
        router.refresh()
        return created
    }

    return (
        <DataContextProvider
            value={{
                user, 
                setUser, 
                characters, 
                setCharacters, 
                addCharacter,
                loading: false
            }}
        >
            {children}
        </DataContextProvider>
    )
}
