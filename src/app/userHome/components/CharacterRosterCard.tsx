import { Character } from '@/types/character';

interface CharacterRosterCardProps {
    character: Character;
}

export default function CharacterRosterCard({character}: CharacterRosterCardProps) {
    return (
        <div className="flex items-center bg-gray-800 m-2 p-4 rounded-lg w-full">
            <div className="w-16 h-16 rounded-full bg-gray-300 mr-2 mb-4 overflow-hidde shrink-0">
                <img src="" alt={character.name}/>
                </div>
            <div className="flex-1 w-full text-center">
                <h3>{character.name}</h3>
                <dl className="flex w-full justify-around mt-2">
                    <div className="flex mr-2">
                        <dt>Level:</dt>
                        <dd>{character.level}</dd>
                    </div>

                    <div className="flex mr-2">
                        <dt>Class:</dt>
                        <dd>{character.character_class_id}</dd>
                    </div>

                    <div className="flex mr-2">
                        <dt>Race:</dt>
                        <dd>{character.race_id}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};