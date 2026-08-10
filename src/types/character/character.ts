// types/character/character.ts

import { AbilityScoreType, AbilityScoreInput, SkillType, SkillInput, CombatStatsType, CombatStatsInput } from '@/types'

interface CharacterBase {
    name: string
    level: number
    experience_points: number
    alignment: string
    background?: string
    character_class_id: string
    race_id: string
    subclass_id: string | null
    subrace_id: string | null
    languages: string[]
}
export interface CharacterType extends CharacterBase {
    id: number
    user_id: number
    ability_scores: AbilityScoreType[]
    skills: SkillType[]
    combat_stats: CombatStatsType | null
}

export interface CharacterInput {
    character: CharacterBase
    ability_scores: AbilityScoreInput[]
    skills: SkillInput[]
    combat_stats?: CombatStatsInput
}

export type CharacterMode = 'create' | 'view' | 'edit'

