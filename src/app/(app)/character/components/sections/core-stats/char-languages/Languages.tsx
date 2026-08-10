import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface LanguagesProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Languages({character, editable = false, create = false}: LanguagesProps) {
    return ( 
        <div>
            <Field label="Languages" value='' editable={editable}/>
        </div>
    )}