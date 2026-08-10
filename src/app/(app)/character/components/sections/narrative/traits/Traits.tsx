import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface TraitsProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Traits({character, editable = false, create = false}: TraitsProps) {
    return ( 
        <div>
            <Field label="Traits" value='' editable={editable}/>
        </div>
    )}