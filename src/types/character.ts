// types/character.ts

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
}

export type CharacterInput = CharacterBase

export type CharacterMode = 'create' | 'view' | 'edit'

