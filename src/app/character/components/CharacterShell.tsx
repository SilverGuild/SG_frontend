import CharacterSheet from './CharacterSheet'
import { CharacterType, CharacterMode } from '@/types'

interface CharacterShellProps {
    mode?: CharacterMode
    character?: CharacterType
}

export default function Character({ mode = 'create', character }: CharacterShellProps) {
    const heading = mode === 'create' ? 'New Character' : character?.name ?? 'Unnamed Character'
    const summary = character 
        ? `Level ${character.level} ${character.race_id} ${character.character_class_id}`
        : null

    return (
       <div>
            <header>
                <h1>{heading}</h1>
                {mode !== 'create' && summary && <p>{summary}</p>}
            </header>
            <CharacterSheet character={character} editable={mode !== 'view'} />
       </div> 
    );
}