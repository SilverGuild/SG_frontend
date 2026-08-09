export interface CombatStatsBase {
    current_hp: number
    max_hp: number
    temporary_hp: number
    hit_dice_remaining: number
    death_save_successes: 0 | 1 | 2 | 3
    death_save_failures: 0 | 1 | 2 | 3
    stable: boolean
    armor_class: number
    conditions: string[]
}

export interface CombatStatsType extends CombatStatsBase {
    id: number
    character_id: number
}

export type CombatStatsInput = CombatStatsBase