import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface SkillProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Skill({character, editable = false, create = false}: SkillProps) {
    return ( 
        <div>
            <Field label="" value='' editable={editable}/>
        </div>
    )}