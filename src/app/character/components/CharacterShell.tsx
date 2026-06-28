import CharacterSheet from './CharacterSheet'
import { CharacterType, CharacterMode } from '@/types'

interface CharacterShellProps {
    mode?: CharacterMode
    character?: CharacterType
}

export default function Character({ mode = 'create', character }: CharacterShellProps) {
    const heading = mode === 'create' ? 'New Character' : character?.name ?? 'Unnamed Character'

    return (
       <div>
            <header>
                <h1>{heading}</h1>
            </header>
            <CharacterSheet character={character} editable={mode !== 'view'} create={mode === 'create'}/>
       </div> 
    );
}