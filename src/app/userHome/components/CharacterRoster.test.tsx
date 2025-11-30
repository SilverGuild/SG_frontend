import { render, screen } from '@testing-library/react'
import CharacterRoster from './CharacterRoster'
import { mockCharacters } from '@/lib/mock/characterData'
import '@testing-library/jest-dom'

describe('CharacterRoster', () => {
    it('renders all character cards', () => {
        render(<CharacterRoster characters={mockCharacters} />)
        console.log(mockCharacters);

        mockCharacters.forEach((character) => {
            expect(screen.getByText(character.name)).toBeInTheDocument()
        })
    })

    it('renders the correct number of character roster cards', () => {
        render(<CharacterRoster characters={mockCharacters} />)

        const characterCards = mockCharacters.map(character => {
            screen.getByText(character.name)
        })

        expect(characterCards).toHaveLength(mockCharacters.length)
    })

    it('shows empty state when no characters', () => {
        render(<CharacterRoster characters={[]} />)

        expect(screen.getByText(/No character data available!/i)).toBeInTheDocument()
    })
})
