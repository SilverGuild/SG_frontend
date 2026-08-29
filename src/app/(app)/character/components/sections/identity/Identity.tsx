'use client'

import { useCharacterDraft } from '@/app/providers'
import Field from '../../shared/Field'



export default function Identity() {
    const { draft, editable, setField } = useCharacterDraft()
    
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Field 
                label="Name" 
                value={draft.name} 
                editable={editable}
                onChange={(value) => setField('name', value)}
            />
            <Field 
                label="Class" 
                value={draft.character_class_id} 
                editable={editable}
                onChange={(value) => setField('character_class_id', value)}
            />
            <Field 
                label="Level" 
                value={draft.level} 
                editable={editable}
                onChange={(value) => {
                    if (value === '') {
                        setField('level', 0)
                        return
                    }
                    const parsed = Number(value)
                    if (!Number.isNaN(parsed)) setField('level', parsed)
                }}
            />
            <Field 
                label="Race" 
                value={draft.race_id} 
                editable={editable}
                onChange={(value) => setField('race_id', value)}
            />
            <Field 
                label="Background" 
                value={draft.background} 
                editable={editable}
                onChange={(value) => setField('background', value)}
            />
            <Field 
                label="Alignment" 
                value={draft.alignment} 
                editable={editable}
                onChange={(value) => setField('alignment', value)}
            />
        </div>
    )
}