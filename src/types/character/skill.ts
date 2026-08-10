export interface SkillBase {
    skill_id: string
    proficient: boolean
    expertise: boolean
}

export interface SkillType extends SkillBase {
    id: number
    character_id: number
}

export type SkillInput = SkillBase