export type AbilityId = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'

export interface AbilityScoreBase {
    ability_id: AbilityId
    score: number
    saving_throw_proficient: boolean
}

export interface AbilityScoreType extends AbilityScoreBase {
    id: number
    character_id: number
}

export type AbilityScoreInput = AbilityScoreBase