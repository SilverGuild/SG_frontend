import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface ProficienciesProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Proficiencies({character, editable = false, create = false}: ProficienciesProps) {
    return ( 
        <div>
            <Field label="Proficiencies" value='' editable={editable}/>
        </div>
    )}