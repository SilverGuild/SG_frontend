import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface AbilitiesProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Abilities({character, editable = false, create = false}: AbilitiesProps) {
    return ( 
        <div>
            <Field label="Abilities" value='' editable={editable}/>
        </div>
    )}