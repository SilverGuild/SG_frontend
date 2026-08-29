'use client'

import { useCharacterDraft } from '@/app/providers'
import Checkbox from '../../../shared/Checkbox'
import { SKILL_IDS } from '@/lib/constants/dnd'

function humanizeSkillId(skill_id: string): string {
    return skill_id
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export default function Skills() {
    const { draft, editable, setSkill } = useCharacterDraft()

    return ( 
        <div className="flex flex-col gap-2">
            {SKILL_IDS.map((skill_id) => {
                const entry = draft.skills.find((s) => s.skill_id === skill_id)
                const proficient = entry?.proficient ?? false
                const expertise = entry?.expertise ?? false
                
                return (
                    <div key={skill_id} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-moonlight">{humanizeSkillId(skill_id)}</span>
                        <div>
                            <Checkbox 
                                label="Proficient"
                                checked={proficient}
                                editable={editable}
                                onChange={(checked) => setSkill(skill_id, { proficient: checked })}
                            />
                            <Checkbox 
                                label="Expertise"
                                checked={expertise}
                                editable={editable}
                                onChange={(checked) => setSkill(skill_id, { expertise: checked })}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}