import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface DefensesProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Defenses({character, editable = false, create = false}: DefensesProps) {
    return ( 
        <div>
            <Field label="Defenses" value='' editable={editable}/>
        </div>
    )}