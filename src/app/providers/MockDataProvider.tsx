'use client'

import { useState, ReactNode } from 'react'
import { DataProvider } from '@/app/providers'
import { User, Character } from '@/types'
import {mockUser, mockCharacters } from '@/mocks'

export function MockDataProvider({ children }: { children: ReactNode}) {
    const [ user, setUser ] = useState<User | null>(mockUser)
    const [ characters, setCharacters ] = useState(mockCharacters)

    return (
        <DataProvider
            value={{
                user, 
                setUser, 
                characters, 
                setCharacters, 
                loading: false, 
                isMockData:true
            }}
        >
            {children}
        </DataProvider>
    )
}
