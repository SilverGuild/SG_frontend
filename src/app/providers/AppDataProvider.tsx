'use client'

import { useState, ReactNode } from 'react'
import {useRouter } from 'next/navigation'
import { DataContextProvider } from '@/app/providers'
import { createCharacter, updateCharacter } from '@/lib/api/api'
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
        const created = await createCharacter(user.id, input)
    setCharacters((prev) => [...prev, created])
        router.refresh()
        return created
    }

    async function updateCharacter(id: number, changes: Partial<CharacterType>): Promise<CharacterType> {
        const updated = await updateCharacter(id, changes)
        setCharacters((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
        router.refresh()
        return updated
    }

    return (
        <DataContextProvider
            value={{
                user, 
                setUser, 
                characters, 
                setCharacters, 
                addCharacter,
                updateCharacter,
                loading: false
            }}
        >
            {children}
        </DataContextProvider>
    )
}
