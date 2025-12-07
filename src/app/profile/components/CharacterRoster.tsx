import { Character } from '@/types/character'
import CharacterRosterCard from './CharacterRosterCard'

interface CharacterRosterProps {
    characters: Character[]
}

export default function CharacterRoster({ characters }: CharacterRosterProps) {
    const content = !characters.length ? (
        <div>No character data available!</div> // Receive error from back end display
    ) : (
        characters.map((character) => (
            <CharacterRosterCard key={character.id} character={character} />
        ))
    )

    return (
        <div data-testid="character-roster" className="flex flex-col items-center flex-2 bg-cyan-950 m-4 p-4 rounded-lg w-2/3">
            { content }
        </div>
    )
}
