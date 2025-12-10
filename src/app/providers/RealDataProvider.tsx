'use client'

import { useState, ReactNode, useEffect } from 'react'
import { DataProvider } from '@/app/providers'
import {User, Character } from '@/types'
import { fetchUser } from '@/lib/api'

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

                const userData = await fetchUser(userId!)
                setUser(userData)

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
