import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface DeathSavesProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function DeathSaves({character, editable = false, create = false}: DeathSavesProps) {
    return ( 
        <div>
            <Field label="Death Saves" value='' editable={editable}/>
        </div>
    )}