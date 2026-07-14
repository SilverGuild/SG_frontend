import { CharacterType } from '@/types'
import CharacterRosterCard from './CharacterRosterCard'

interface CharacterRosterProps {
    characters: CharacterType[]
}

export default function CharacterRoster({ characters }: CharacterRosterProps) {
    const content = !characters.length ? (
        <div className="text-ashsilver py-8">No character data available!</div> // Receive error from back end display
    ) : (
        characters.map((character) => (
            <CharacterRosterCard key={character.id} character={character} />
        ))
    )

    return (
        <div 
            data-testid="character-roster" 
            className="flex flex-col justify-center py-5 px-6 w-full rounded-2xl border border-mist/50 bg-nightveil/60 backdrop-blur-md"
        >
            <h2 className="text-4xl text-left my-5 title-font text-moonbeam [text-shadow:_0_0_16px_var(--color-lunar)]">
                Characters:
            </h2>
            <div className="flex flex-row flex-nowrap gap-5 overflow-x-auto w-full py-6 px-2 -mx-2">
                { content }
            </div>
        </div>
    )
}
