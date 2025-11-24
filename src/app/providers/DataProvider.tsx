'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';
import { Character } from '@/types/character';
import { SG_API_BASE_URL, SG_API_ENDPOINTS } from '@/lib/config';
import { mockUser } from '@/lib/mock/userData';
import { mockCharacters} from '@/lib/mock/characterData';

interface DataContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    characters: Character[];
    setCharacters: (characters: Character[]) => void;
}

const DataContext = createContext<DataContextType | null>(null);

const USE_MOCK_DATA = true;

export function DataProvider({ children }: {children : ReactNode}) {
    const [ user, setUser ] = useState<User | null>(USE_MOCK_DATA ? mockUser : null);
    const [ characters, setCharacters ] = useState<Character[]>(USE_MOCK_DATA ? mockCharacters : []);

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
