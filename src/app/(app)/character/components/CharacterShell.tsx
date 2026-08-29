'use client'

import CharacterSheet from './CharacterSheet'
import { CharacterType, CharacterMode } from '@/types'
import { CharacterDraftProvider, useCharacterDraft } from '@/app/providers'

interface CharacterShellProps {
    mode?: CharacterMode
    character?: CharacterType
}


export default function CharacterShell({ mode = 'create', character }: CharacterShellProps) {
    return (
        <CharacterDraftProvider mode={mode} initialCharacter={character}>
            <CharacterShellContent />
        </CharacterDraftProvider>
    )

} 

function CharacterShellContent() {
    const { mode, draft, submit, pending, error } = useCharacterDraft()
    const heading = mode === 'create' ? 'New Character' : draft.name ?? 'Unnamed Character'
    

    async function handleSubmit() {
        try {
            await submit()
        } catch {

        }
    }

     return (
       <div className="min-h-full animate-fade-in-up">
            <header className="mb-6">
                <h1 className="m-0 text-3xl font-b0ld text-moonbeam">{heading}</h1>
            </header>
            <CharacterSheet />
            {mode !== 'view' && (
            <div className="flex w-full justify-end">
                <button
                    type="submit"
                    disabled={pending}
                    className="relative inline-flex w-1/4 items-center justify-center p-0.5 mt-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-lunar to-arcane transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--color-arcane)] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0"
                >
                    <span className="relative block w-full px-5 py-2.5 bg-nightveil rounded-md text-center text-moonbeam group-hover:bg-transparent transition-all duration-200">
                        { pending ? (mode === 'create' ? 'Creating...' : 'Saving...') : (mode === 'create' ? 'Create' : 'Save') }
                    </span>
                </button>
            </div>
            )}
       </div> 
    );
}
