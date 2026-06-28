import { render, screen } from '@testing-library/react'
import CharacterRoster from '../components/CharacterRoster'
import { makeCharacters } from '@/test/factories'
import '@testing-library/jest-dom'

const testCharacters = makeCharacters(4)

describe('CharacterRoster', () => {
    it('renders all character cards', () => {
        render(<CharacterRoster characters={testCharacters} />)

        testCharacters.forEach((character) => {
            expect(screen.getByText(character.name)).toBeInTheDocument()
        })
    })

    it('renders the correct number of character roster cards', () => {
        render(<CharacterRoster characters={testCharacters} />)

        const characterCards = testCharacters.map(character => {
            screen.getByText(character.name)
        })

        expect(characterCards).toHaveLength(testCharacters.length)
    })

    it('shows empty state when no characters', () => {
        render(<CharacterRoster characters={[]} />)

        expect(screen.getByText(/No character data available!/i)).toBeInTheDocument()
    })
})
