import { Character } from '@/types/character'
import CharacterRosterCard from './CharacterRosterCard'

interface CharacterRosterProps {
    characters: Character[]
}

export default function CharacterRoster({ characters }: CharacterRosterProps) {
    if (!characters) {
        return <div>No character data available!</div> // Receive error from back end display
    }

    const roster = characters.map((character) => {
        return <CharacterRosterCard key={character.id} character={character} />
    })

    return (
        <div className="flex flex-col items-center flex-2 bg-cyan-950 m-4 p-4 rounded-lg w-full">
            {roster}
        </div>
    )
}
