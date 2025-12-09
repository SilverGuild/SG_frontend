import { render, screen } from '@testing-library/react'
import CharacterRosterCard from './CharacterRosterCard'
import { mockCharacters } from '@/mocks/characterData'
import '@testing-library/jest-dom'



describe('CharacterRosterCard', () => {
    const mockCharacter = mockCharacters[0]
    
    beforeEach(() => {
        render(<CharacterRosterCard character={mockCharacter} />)
    })

    it('renders character token', () => {
        const img = screen.getByAltText(mockCharacter.name)
        expect(img).toBeInTheDocument()
    })

    it('renders character name', () => {
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(mockCharacter.name)
    })

    it('renders character level', () => {
        expect(screen.getByText('Level:')).toBeInTheDocument()
        expect(screen.getByText(mockCharacter.level.toString())).toBeInTheDocument()
    })
    
    it('renders character class', () => {
        expect(screen.getByText('Class:')).toBeInTheDocument()
        expect(screen.getByText(mockCharacter.character_class_id)).toBeInTheDocument()
    })
    
    it('renders character race', () => {
        expect(screen.getByText('Race:')).toBeInTheDocument()
        expect(screen.getByText(mockCharacter.race_id)).toBeInTheDocument()
    })

})