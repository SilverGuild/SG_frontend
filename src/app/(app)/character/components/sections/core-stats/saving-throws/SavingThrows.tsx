import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface SavingThrowProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Proficiencies({character, editable = false, create = false}: SavingThrowProps) {
    return ( 
        <div>
            <Field label="Saving Throws" value='' editable={editable}/>
        </div>
    )}