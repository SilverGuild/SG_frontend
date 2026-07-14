import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface SkillsProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Skills({character, editable = false, create = false}: SkillsProps) {
    return ( 
        <div>
            <Field label="Skills" value='' editable={editable}/>
        </div>
    )}