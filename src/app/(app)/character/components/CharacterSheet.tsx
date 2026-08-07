import { CharacterType } from '@/types'

import Section from './shared/Section'
import { Identity, 
        Inspiration, 
        ProficiencyBonus, 
        Abilities, 
        Skills, 
        Passives,
        Proficiencies,
        DeathSaves,
        Languages,
        Defenses,
        HitPoints,
        Features,
        Traits,
    } from './sections'

interface CharcterSheetProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function CharacterSheet({ character, editable = false, create = false}: CharcterSheetProps) {

    return (
        <>
            {/* Top bar -> Identity, Inspiration, Proficiency Bonus */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr_1fr] pb-4">
                {/* Identity -> name, class & level, race, background, alignment, XP */}
                <Section>
                    <Identity character={character} editable={editable} create={create}/>
                </Section>
                {/* Inspiration */}
                <Section>
                    <Inspiration />
                </Section>
                {/* Proficiency bonus */}
                  <Section>
                    <ProficiencyBonus />
                </Section>
            </div>

            {/* Character sheet grid -> grows to fill remaining height; one row on wide screens */}
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-1">
                {/* Column 1 -> Core stats */}
                <div className="flex flex-col gap-4">
                    {/* Sub-columns -> abilities/saves on the left, skills on the right */}
                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-1">
                        {/* Sub-column left -> Abilities */}
                        <div className="flex flex-col gap-4">
                            {/* Abilities (x6) */}
                            <Section>
                                <Abilities />
                            </Section>
                        </div>
                        {/* Sub-column right -> Skills (x18) */}
                        <Section>
                            <Skills />
                        </Section>
                    </div>
                    {/* Footer -> spans both sub-columns */}
                    <div className="flex flex-1 flex-col gap-4">
                        {/* Passives -> Perception, Insight, Investigation */}
                        <Section>
                            <Passives />
                        </Section>
                        {/* Proficiencies & languages */}
                        <Section>
                            <Proficiencies />
                            <Languages />
                        </Section>
                    </div>
                </div>

                {/* Column 2 -> Combat */}
                <div className="flex flex-col gap-4">
                    {/* Defenses -> AC, initiative, speed */}
                    <Section>
                        <Defenses />
                    </Section>
                    {/* Hit points -> current, max, temp */}
                    <Section>
                        <HitPoints />
                    </Section>
                    {/* Death saves */}
                    <Section>
                        <DeathSaves />
                    </Section>
                    {/* Attacks & spells (list) */}
                    <Section>Attacks & spells</Section>
                    {/* Equipment (list) */}
                    <Section>Equipment</Section>
                </div>

                {/* Column 3 -> Character */}
                <div className="flex flex-col gap-4">
                    {/* Features & traits (list) */}
                    <Section>
                        <Features />
                        <Traits />
                    </Section>
                    {/* Personality -> ideals, bonds, flaws */}
                    <Section>Personality</Section>
                    {/* Inventory, description, notes (list) */}
                    <Section>Inventory & notes</Section>
                </div>
            </div>
        </>
    );
}