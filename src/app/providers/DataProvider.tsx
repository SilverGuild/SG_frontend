'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, Character, DataContextType } from '@/types'
import { mockUser, mockCharacters } from '@/mocks'
import { fetchUser } from '@/lib/api'

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children, userId }: { children: ReactNode; userId: number }) {
    return (
        <DataContext.Provider value={userId}>
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
