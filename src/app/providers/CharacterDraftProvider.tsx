'use client'

import { createContext, useContext, useReducer, useState, ReactNode } from 'react'
import { useData } from '@/app/providers'
import { 
    CharacterType,
    CharacterInput,
    AbilityId,
    AbilityScoreInput,
    SkillInput,
    CombatStatsInput,
} from '@/types'

const ABILITY_IDS: AbilityId[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

const DEFAULT_COMBAT_STATS: CombatStatsInput = {
   current_hp: 0,
    max_hp: 0,
    temporary_hp: 0,
    hit_dice_remaining: 0,
    death_save_successes: 0,
    death_save_failures: 0,
    stable: true,
    armor_class: 10,
    conditions: [],
}

interface CharacterDraftState {
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
    ability_scores: AbilityScoreInput[]
    skills: SkillInput[]
    combat_stats: CombatStatsInput
}

function buildDefaultDraft(): CharacterDraftState {
    return {
        name: '',
        level: 1,
        experience_points: 0,
        alignment: '',
        background: undefined,
        character_class_id: '',
        race_id: '',
        subclass_id: null,
        subrace_id: null,
        languages: [],
        ability_scores: ABILITY_IDS.map((ability_id) => ({
            ability_id,
            score: 10,
            saving_throw_proficient: false
        })),
        skills: [],
        combat_stats: { ...DEFAULT_COMBAT_STATS },
    }
}

function buildDraftFromCharacter(character: CharacterType): CharacterDraftState {
    return {
        name: character.name,
        level: character.level,
        experience_points: character.experience_points,
        alignment: character.alignment,
        background: character.background,
        character_class_id: character.character_class_id,
        race_id: character.race_id,
        subclass_id: character.subclass_id,
        subrace_id: character.subrace_id,
        languages: character.languages,
        ability_scores: character.ability_scores.map(({ ability_id, score, saving_throw_proficient }) => ({
            ability_id,
            score,
            saving_throw_proficient,
        })),
        skills: character.skills.map(({ skill_id, proficient, expertise }) => ({
            skill_id,
            proficient,
            expertise
        })),
        combat_stats: character.combat_stats 
            ? {
                current_hp: character.combat_stats.current_hp,
                max_hp: character.combat_stats.max_hp,
                temporary_hp: character.combat_stats.temporary_hp,
                hit_dice_remaining: character.combat_stats.hit_dice_remaining,
                death_save_successes: character.combat_stats.death_save_successes,
                death_save_failures: character.combat_stats.death_save_failures,
                stable: character.combat_stats.stable,
                armor_class: character.combat_stats.armor_class,
                conditions: character.combat_stats.conditions,
            }
            : { ...DEFAULT_COMBAT_STATS}
    }
}

type NonNestedField = keyof Omit<CharacterDraftState, 'ability_scores' | 'skills' | 'combat_stats'>

type DraftAction =
    | { type: 'SET_FIELD'; field: NonNestedField; value: CharacterDraftState[NonNestedField] }
    | { type: 'SET_ABILITY_SCORE'; ability_id: AbilityId; changes: Partial<Omit<AbilityScoreInput, 'ability_id'>> }
    | { type: 'SET_SKILL'; skill_id: string; changes: Partial<Omit<SkillInput, 'skill_id '>> }
    | { type: 'REMOVE_SKILL'; skill_id: string }
    | { type: 'SET_COMBAT_STATS'; changes: Partial<CombatStatsInput> }

function draftReducer(state: CharacterDraftState, action: DraftAction): CharacterDraftState {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value }
            
        case 'SET_ABILITY_SCORE':
            return {
                ...state,
                ability_scores: state.ability_scores.map((a) => 
                    a.ability_id === action.ability_id ? { ...a, ...action.changes } : a 
                ),
            }

        case 'SET_SKILL': {
            const existing = state.skills.find((s) => s.skill_id === action.skill_id)
            const merged: SkillInput = existing
                ? { ...existing, ...action.changes }
                : { skill_id: action.skill_id, proficient: false, expertise: false, ...action.changes }

            // Enforce expertise requires proficient
            if (!merged.proficient) merged.expertise = false

            return {
                ...state,
                skills: existing 
                    ? state.skills.map((s) => (s.skill_id === action.skill_id ? merged : s))
                    : [...state.skills, merged],
            }
        }

        case 'REMOVE_SKILL':
            return { ...state, skills: state.skills.filter((s) => s.skill_id !== action.skill_id) }

        case 'SET_COMBAT_STATS':
            return { ...state, combat_stats: { ...state.combat_stats, ...action.changes } }

        default:
            return state
    }
}

interface CharacterDraftContextValue {
    draft: CharacterDraftState
    setField: < K extends NonNestedField>(field: K, value: CharacterDraftState[K]) => void
    setAbilityScore: (ability_id: AbilityId, changes: Partial<Omit<AbilityScoreInput, 'ability_id'>> ) => void
    setSkill: (skill_id: string, changes: Partial<Omit<SkillInput, 'skill_id'>> ) => void
    removeSkill: (skill_id: string) => void
    setCombatStats: (changes: Partial<CombatStatsInput>) => void
    submit: () => Promise<CharacterType>
    pending: boolean
    error: string | null
}

const CharacterDraftContext = createContext<CharacterDraftContextValue | null>(null)  

interface CharacterDraftProviderProps {
    mode: 'create' | 'edit'
    initialCharacter?: CharacterType
    children: ReactNode
}

export function CharacterDraftProvider({ mode, initialCharacter, children } : CharacterDraftProviderProps) {
    const { addCharacter, updateCharacter } = useData()
    const initialDraft = mode === 'edit' && initialCharacter
        ? buildDraftFromCharacter(initialCharacter)
        : buildDefaultDraft()
    const [state, dispatch] = useReducer(draftReducer, initialDraft)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    function setField<K extends NonNestedField>(field: K, value:CharacterDraftState[K]) {
        dispatch({ type: 'SET_FIELD', field, value})
    }

    function setAbilityScore(ability_id: AbilityId, changes: Partial<Omit<AbilityScoreInput, 'ability_id'>>) {
        dispatch({type: 'SET_ABILITY_SCORE', ability_id, changes })
    }
    function setSkill(skill_id: string, changes: Partial<Omit<SkillInput, 'skill_id' >>) {
        dispatch({type: 'SET_SKILL', skill_id, changes })
    }
    function removeSkill(skill_id: string) {
        dispatch({type: 'REMOVE_SKILL', skill_id})
    }
    function setCombatStats(changes: Partial<CombatStatsInput>) {
        dispatch({type: 'SET_COMBAT_STATS', changes })
    }

    async function submit(): Promise<CharacterType> {
        setPending(true)
        setError(null)
        try {
            if (mode === 'create') {
                const payload: CharacterInput = {
                    character: {
                          name: state.name,
                        level: state.level,
                        experience_points: state.experience_points,
                        alignment: state.alignment,
                        background: state.background,
                        character_class_id: state.character_class_id,
                        race_id: state.race_id,
                        subclass_id: state.subclass_id,
                        subrace_id: state.subrace_id,
                        languages: state.languages,
                    },
                    ability_scores: state.ability_scores,
                    skills: state.skills,
                    combat_stats: state.combat_stats
                }
                return await addCharacter(payload)
            }

            if (!initialCharacter) throw new Error('Cannot update a character without an id')
            return await updateCharacter(initialCharacter.id, {
                name: state.name,
                level: state.level,
                experience_points: state.experience_points,
                alignment: state.alignment,
                background: state.background,
                character_class_id: state.character_class_id,
                race_id: state.race_id,
                subclass_id: state.subclass_id,
                subrace_id: state.subrace_id,
                languages: state.languages,
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
            throw err
        } finally {
            setPending(false)
        }
    }

    return (
        <CharacterDraftContext.Provider
            value={{ draft: state, setField, setAbilityScore, setSkill, removeSkill, setCombatStats, submit, pending, error }}
        >
            {children}
        </CharacterDraftContext.Provider>
    )
}

export function useCharacterDraft() {
    const context = useContext(CharacterDraftContext)
    if (!context) {
        throw new Error('useCharacterDraft must be used within a CharacterDraftProvider')
    }
    return context
}