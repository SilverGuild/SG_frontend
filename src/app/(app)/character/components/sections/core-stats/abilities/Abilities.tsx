'use client'

import { useCharacterDraft } from '@/app/providers'
import Field from '../../../shared/Field'
import { ABILITY_ORDER, ABILITY_LABELS } from '@/lib/constants/dnd'
import Checkbox from '../../../shared/Checkbox'


export default function Abilities() {
    const { draft, editable, setAbilityScore} = useCharacterDraft()
    
    return ( 
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
           {ABILITY_ORDER.map((ability_id) => {
            const entry = draft.ability_scores.find((a) => a.ability_id === ability_id)
            const score = entry?.score ?? 10
            const savingThrowProficient = entry?.saving_throw_proficient ?? false
            
            return (
                <div key={ability_id} className="flex flex-col gap-1">
                    <Field
                        label={ABILITY_LABELS[ability_id]}
                        value={score}
                        editable={editable}
                        onChange={(value) => {
                            if (value === '') {
                                setAbilityScore(ability_id, {score: 0})
                                return
                            }
                            const parsed = Number(value)
                            if (!Number.isNaN(parsed)) setAbilityScore(ability_id, {score: parsed})
                        }} 
                    />
                    <Checkbox
                        label="Saving throw"
                        checked={savingThrowProficient}
                        editable={editable}
                        onChange={(checked) => setAbilityScore(ability_id, { saving_throw_proficient: checked })}
                    />
                </div>
            )
           })}
        </div>
    )}