import { CharacterType } from '@/types'
import Field from '../../../shared/Field'

interface FeaturesProps {
    character?: CharacterType
    editable?: boolean
    create?: boolean
}

export default function Features({character, editable = false, create = false}: FeaturesProps) {
    return ( 
        <div>
            <Field label="Features" value='' editable={editable}/>
        </div>
    )}