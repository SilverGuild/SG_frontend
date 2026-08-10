'use client'

import { useState } from 'react'
import CharacterSheet from './CharacterSheet'
import { CharacterType, CharacterMode } from '@/types'

interface CharacterShellProps {
    mode?: CharacterMode
    character?: CharacterType
}

export default function Character({ mode = 'create', character }: CharacterShellProps) {
    const heading = mode === 'create' ? 'New Character' : character?.name ?? 'Unnamed Character'

    const [ error, setError ] = useState<string | null>(null)
    const [ pending, setPending ] = useState(false)

    return (
       <div className="min-h-full animate-fade-in-up">
            <header className="mb-6">
                <h1 className="m-0 text-3xl font-b0ld text-moonbeam">{heading}</h1>
            </header>
            <CharacterSheet character={character} editable={mode !== 'view'} create={mode === 'create'}/>
            {mode === 'create' && (
            <div className="flex w-full justify-end">
                <button
                    type="submit"
                    disabled={pending}
                    className="relative inline-flex w-1/4 items-center justify-center p-0.5 mt-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-lunar to-arcane transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--color-arcane)] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0"
                >
                    <span className="relative block w-full px-5 py-2.5 bg-nightveil rounded-md text-center text-moonbeam group-hover:bg-transparent transition-all duration-200">
                        { pending ? 'Creating...' : 'Create' }
                    </span>
                </button>
            </div>
            )}
       </div> 
    );
}