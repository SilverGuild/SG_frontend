import CharacterSheet from './CharacterSheet'
import { CharacterType, CharacterMode } from '@/types'

interface CharacterShellProps {
    mode?: CharacterMode
    character?: CharacterType
}

export default function Character({ mode = 'create', character }: CharacterShellProps) {
    const heading = mode === 'create' ? 'New Character' : character?.name ?? 'Unnamed Character'

    return (
       <div className="min-h-full animate-fade-in-up">
            <header className="mb-6">
                <h1 className="m-0 text-3xl font-blod text-moonbeam">{heading}</h1>
            </header>
            <CharacterSheet character={character} editable={mode !== 'view'} create={mode === 'create'}/>
       </div> 
    );
}