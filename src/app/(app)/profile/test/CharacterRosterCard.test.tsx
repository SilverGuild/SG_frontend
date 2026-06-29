import { render, screen } from '@testing-library/react'
import CharacterRosterCard from '../components/CharacterRosterCard'
import { makeCharacters } from '@/test/factories'
import '@testing-library/jest-dom'

const testCharacters = makeCharacters(4)

describe('CharacterRosterCard', () => {
    const testCharacter = testCharacters[0]
    
    beforeEach(() => {
        render(<CharacterRosterCard character={testCharacter} />)
    })

    it('renders character token', () => {
        const img = screen.getByAltText(testCharacter.name)
        expect(img).toBeInTheDocument()
    })

    it('renders character name', () => {
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(testCharacter.name)
    })

    it('renders character level', () => {
        expect(screen.getByText('Level:')).toBeInTheDocument()
        expect(screen.getByText(testCharacter.level.toString())).toBeInTheDocument()
    })
    
    it('renders character class', () => {
        expect(screen.getByText('Class:')).toBeInTheDocument()
        expect(screen.getByText(testCharacter.character_class_id)).toBeInTheDocument()
    })
    
    it('renders character race', () => {
        expect(screen.getByText('Race:')).toBeInTheDocument()
        expect(screen.getByText(testCharacter.race_id)).toBeInTheDocument()
    })

})