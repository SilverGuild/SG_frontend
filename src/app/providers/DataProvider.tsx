'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types/user'
import { Character } from '@/types/character'
import { mockUser, mockCharacters } from '@/mocks'
import { fetchUser } from '@/lib/api'

interface DataContextType {
    user: User | null
    setUser: (user: User | null) => void
    characters: Character[]
    setCharacters: (characters: Character[]) => void
    loading: boolean
}

const DataContext = createContext<DataContextType | null>(null)

// Toggle this to switch between mock and real data
const USE_MOCK_DATA = true

export function DataProvider({ children, userId }: { children: ReactNode; userId: number }) {
    const [user, setUser] = useState<User | null>(USE_MOCK_DATA ? mockUser : null)
    const [characters, setCharacters] = useState<Character[]>(USE_MOCK_DATA ? mockCharacters : [])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!USE_MOCK_DATA && !userId) {
            return
        }

        async function loadData() {
            try {
                setLoading(true)

                if (USE_MOCK_DATA) {
                    setUser(mockUser)
                    setCharacters(mockCharacters)
                } else {
                    const userData = await fetchUser(userId)
                    setUser(userData)
                }
            } catch (error) {
                console.error('Failed to load data:', error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [userId])

    return (
        <DataContext.Provider value={{ user, setUser, characters, setCharacters, loading }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    const context = useContext(DataContext)

    if (!context) {
        throw new Error('useData must be used within a DataProvider')
    }

    return context
}
