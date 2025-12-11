'use client'

import { ReactNode } from 'react'
import { MockDataProvider, RealDataProvider } from '@/app/providers'

const USE_MOCK_DATA = true

export function AppDataProvider({ 
    children, 
    userId
}: { 
    children: ReactNode,
    userId?: number 
}) {
    if(USE_MOCK_DATA) {
        return <MockDataProvider>{children}</MockDataProvider>
    }

    return <RealDataProvider userId={userId}>{children}</RealDataProvider>
}