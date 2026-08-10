import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface InspirationProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Inspiration({character, editable = false, create = false}: InspirationProps) {
    return ( 
        <div>
            <Field label="Inspiration" value='' editable={editable}/>
        </div>
    )}