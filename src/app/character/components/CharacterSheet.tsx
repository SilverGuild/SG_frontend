import { CharacterType } from '@/types'

interface CharcterSheetProps {
    character?: CharacterType
    editable?: boolean
}

export default function CharacterSheet({ character, editable = false}: CharcterSheetProps) {

    return (
        <>
            {/* Top bar -> Identity, Inspiration, Proficiency Bonus */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr_1fr]">
                {/* Identity -> name, class & level, race, background, alignment, XP */}
                <div className="rounded border p-3">Identity</div>
                {/* Inspiration */}
                <div className="rounded border p-3">Inspiration</div>
                {/* Proficiency bonus */}
                <div className="rounded border p-3">Proficiency bonus</div>
            </div>

            {/* Character sheet grid -> grows to fill remaining height; one row on wide screens */}
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-1">
                {/* Column 1 -> Core stats */}
                <div className="flex flex-col gap-4">
                    {/* Sub-columns -> abilities/saves on the left, skills on the right */}
                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-1">
                        {/* Sub-column left -> Abilities over Saving throws */}
                        <div className="flex flex-col gap-4">
                            {/* Abilities (x6) */}
                            <div className="flex-1 rounded border p-3">Abilities</div>
                            {/* Saving throws (x6) */}
                            <div className="flex-1 rounded border p-3">Saving throws</div>
                        </div>
                        {/* Sub-column right -> Skills (x18) */}
                        <div className="rounded border p-3">Skills</div>
                    </div>
                    {/* Footer -> spans both sub-columns */}
                    <div className="flex flex-1 flex-col gap-4">
                        {/* Passives -> Perception, Insight, Investigation */}
                        <div className="flex-1 rounded border p-3">Passives</div>
                        {/* Proficiencies & languages */}
                        <div className="flex-1 rounded border p-3">Proficiencies & languages</div>
                    </div>
                </div>

                {/* Column 2 -> Combat */}
                <div className="flex flex-col gap-4">
                    {/* Defenses -> AC, initiative, speed */}
                    <div className="flex-1 rounded border p-3">Defenses</div>
                    {/* Hit points -> current, max, temp */}
                    <div className="flex-1 rounded border p-3">Hit points</div>
                    {/* Death saves */}
                    <div className="flex-1 rounded border p-3">Death saves</div>
                    {/* Attacks & spells (list) */}
                    <div className="flex-1 rounded border p-3">Attacks & spells</div>
                    {/* Equipment (list) */}
                    <div className="flex-1 rounded border p-3">Equipment</div>
                </div>

                {/* Column 3 -> Character */}
                <div className="flex flex-col gap-4">
                    {/* Features & traits (list) */}
                    <div className="flex-1 rounded border p-3">Features & traits</div>
                    {/* Personality -> ideals, bonds, flaws */}
                    <div className="flex-1 rounded border p-3">Personality</div>
                    {/* Inventory, description, notes (list) */}
                    <div className="flex-1 rounded border p-3">Inventory & notes</div>
                </div>
            </div>
        </>
    );
}