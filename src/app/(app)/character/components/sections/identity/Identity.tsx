import { CharacterType } from '@/types'
import Field from '../../shared/Field'

interface IdentityProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Identity({character, editable = false, create = false}: IdentityProps) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {!create ? 
                <></> : 
                <Field label="Name" value={character?.name} editable={editable}/>
            }
            <Field label="Class" value={character?.character_class_id} editable={editable}/>
            <Field label="Level" value={character?.level} editable={editable}/>
            <Field label="Race" value={character?.race_id} editable={editable}/>
            <Field label="Background" value={character?.background} editable={editable}/>
            <Field label="Alignment" value={character?.alignment} editable={editable}/>
        </div>
    )
}