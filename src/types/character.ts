// types/character.ts
export interface Character {
    id: number;
    name: string;
    level: number;
    experience_points: number;
    alignment: string;
    background: string;
    user_id: number;
    character_class_id: string;
    race_id: string;
    subclass_id: string;
    subrace_id: string;
    languages: string[]
}