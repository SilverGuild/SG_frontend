import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface SkillsProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function ProficiencyBonus({character, editable = false, create = false}: SkillsProps) {
    return ( 
        <div>
            <Field label="ProficiencyBonus" value='' editable={editable}/>
        </div>
    )}