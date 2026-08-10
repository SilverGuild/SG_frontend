import type { AbilityId, AbilityScoreType, SkillType, CombatStatsType, CharacterType } from "@/types"


// Domain Tables 
const CHARACTER_CLASSES: Record<string, (string | null)[]> = {
    barbarian: ['berserker', null],
    bard: ['lore', null],
    cleric: ['life', null],
    druid: ['land', null],
    fighter: ['champion', null],
    monk: ['open-hand', null],
    paladin: ['devotion', null],
    ranger: ['hunter', null],
    rogue: ['thief', null],
    sorcerer: ['draconic', null],
    warlock: ['fiend', null],
    wizard: ['evocation', null],
}

const RACES: Record<string, { subraces: (string | null)[]; languages: string[ ] }> = {
    dragonborn: { subraces: [null], languages: ['common', 'draconic'] },
    dwarf: { subraces: ['hill-dwarf', null], languages: ['common', 'dwarfish'] },
    elf: { subraces: ['high-elf', null], languages: ['common', 'elvish'] },
    gnome: { subraces: ['rock-gnome', null], languages: ['common', 'gnomish'] },
    'half-elf': { subraces: [null], languages: ['common', 'elvish'] },
    'half-orc': { subraces: [null], languages: ['common', 'orc'] },
    halfling: { subraces: ['lightfoot-halfling', null], languages: ['common', 'halfling'] },
    human: { subraces: [null], languages: ['common'] },
    tiefling: { subraces: [null], languages: ['common', 'infernal'] },
}

const ALIGNMENTS = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
] as const

const XP_THRESHOLDS = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000]

export function xpForLevel(level: number): number {
    return XP_THRESHOLDS[level - 1]
}

const ABILITY_IDS: AbilityId[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

// Character Factory
let nextId = 1

export function makeCharacter(overrides: Partial<CharacterType> = {}): CharacterType {
    const id = overrides.id ?? nextId++
    const character_class_id = overrides.character_class_id ?? 'bard'
    const race_id = overrides.race_id ?? 'half-elf'
    const level = overrides.level ?? 5

    const ability_scores: AbilityScoreType[] = ABILITY_IDS.map((ability_id, index) => ({
        id: id *100 + index,
        character_id: id,
        ability_id,
        score: 10,
        saving_throw_proficient: false
    }))

    const skills: SkillType[] = []
    const combat_stats: CombatStatsType = {
        id,
        character_id: id,
        current_hp: 20,
        max_hp: 20,
        temporary_hp: 0,
        hit_dice_remaining: level,
        death_save_successes: 0,
        death_save_failures: 0,
        stable: true,
        armor_class: 12,
        conditions: [],
    }

    return {
        id,
        user_id: 1,
        name: `Test Character ${id}`,
        level,
        experience_points: xpForLevel(level),
        alignment: ALIGNMENTS[0],
        background: 'Folk Hero',
        character_class_id,
        race_id,
        subclass_id: CHARACTER_CLASSES[character_class_id]?.[0] ?? null,
        subrace_id: RACES[race_id]?.subraces[0] ?? null,
        languages: RACES[race_id]?.languages ?? ['common'],
        ability_scores,
        skills,
        combat_stats,
        ...overrides,
    }

}

export function makeCharacters(count: number, overrides: Partial<CharacterType> = {}): CharacterType[] {
    return Array.from({length: count}, () => makeCharacter(overrides))
}