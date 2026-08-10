import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface HitPointsProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function HitPoints({character, editable = false, create = false}: HitPointsProps) {
    return ( 
        <div>
            <Field label="HitPoints" value='' editable={editable}/>
        </div>
    )}