import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface AbilityProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Ability({character, editable = false, create = false}: AbilityProps) {
    return ( 
        <div>
            <Field label="" value='' editable={editable}/>
        </div>
    )}