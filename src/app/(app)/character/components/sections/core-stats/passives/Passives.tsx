import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface PassivesProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Passives({character, editable = false, create = false}:   PassivesProps) {
    return ( 
        <div>
            <Field label="Passives" value='' editable={editable}/>
        </div>
    )}