import { CharacterType } from '@/types/character'
import CharacterRosterCard from './CharacterRosterCard'

interface CharacterRosterProps {
    characters: CharacterType[]
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
        <div data-testid="character-roster" className="flex flex-col justify-center bg-cyan-95 py-5 w-full">
            <h2 className="text-3xl text-left my-5">Characters:</h2>
            <div className="flex flex-row flex-nowrap gap-5 overflow-x-auto w-full">
                { content }
            </div>
        </div>
    )
}
