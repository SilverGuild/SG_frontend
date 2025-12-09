'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { DataContextType } from '@/types'

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children, value }: { children: ReactNode; value: DataContextType }) {
    return (
        <DataContext.Provider value={value}>
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
