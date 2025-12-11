'use client'

import { useState, ReactNode, useEffect } from 'react'
import { DataProvider } from '@/app/providers'
import { User, Character } from '@/types'
import { fetchUser, fetchUserCharacters } from '@/lib/api'

export function RealDataProvider({ children, userId }: { children: ReactNode, userId?: number}) {
    const [ user, setUser ] = useState<User | null>(null)
    const [ characters, setCharacters ] = useState<Character[]>([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() =>{
        if(!userId) {
            setLoading(false)
            return
        }

        async function loadData() {
            try {
                setLoading(true)

                const [ userData, characterData ] = await Promise.all([
                    fetchUser(userId!),
                    fetchUserCharacters(userId!)
                ])

                setUser(userData)
                setCharacters(characterData)

            } catch (error) {
                console.error('Failed to load data:', error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [userId])

    return (
        <DataProvider
            value={{
                user, 
                setUser, 
                characters, 
                setCharacters, 
                loading, 
                isMockData:false
            }}
        >
            {children}
        </DataProvider>
    )
}
