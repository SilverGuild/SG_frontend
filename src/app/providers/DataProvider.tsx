'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';
import { Character } from '@/types/character';

interface DataContextType {
    user: User;
    setUser: (user: any) => void;
    characters: Character[];
    setCharacters: (characters: any[]) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: {children : ReactNode}) {
    const [ user, setUser ] = useState<any>(null);
    const [ characters, setCharacters ] = useState<any[]>([]);

    return (
        <DataContext.Provider value={{ user, setUser, characters, setCharacters }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    
    if (!context) {
        throw new Error('useData must be used within a DataProvider')
    }

    return context;
};