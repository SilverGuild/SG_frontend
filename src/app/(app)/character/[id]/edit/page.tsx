import { notFound } from 'next/navigation'
import { fetchCharacter } from '@/lib/api/api'
import CharacterShell from '../../components/CharacterShell'

export default async function EditCharacter({ params }: {params: Promise<{id: string }> }) {
    const { id } = await params
    
        const characterId = Number(id)
        if (Number.isNaN(characterId)) notFound() // /character/abc -> 404, never hits api
    
        let character
        try {
            character = await fetchCharacter(characterId)
        } catch {
            notFound()
        }
    
        return <CharacterShell mode="view" character={character} />
}
