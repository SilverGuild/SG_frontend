import Image from 'next/image'
import Link from 'next/link'
import { CharacterType } from '@/types/character'

interface CharacterRosterCardProps {
    character: CharacterType
}

export default function CharacterRosterCard({ character }: CharacterRosterCardProps) { 
    const monogram = `https://ui-avatars.com/api/?name=${character.name}&size=96&background=7B9BB3`;
    const avatarSrc = monogram; // Will add conditional to handle switch between default input avatar url and a potential null

    return (
        <Link 
            href={`/character/${character.id}`}
            className="flex flex-col items-center bg-gray-800 p-6 w-64 shrink-0 transition hover:bg-gray-700 focus-visible:outline focus-visible:outline-2"
        >
            <div className="w-20 h-20 rounded-full mt-5 mb-7 overflow-hidden shrink-0">
                <Image src={avatarSrc} alt={character.name} width={96} height={96} />
            </div>
            <div className="w-full min-w-0">
                <h3 className="text-xl font-bold mb-3 p-2 text-center break-words">{character.name}</h3>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 capitalize text-lg">
                    <div className="contents">
                        <dt>Level:</dt>
                        <dd className="min-w-0 break-words">{character.level}</dd>
                    </div>

                    <div className="contents">
                        <dt>Class:</dt>
                        <dd className="min-w-0 break-words">{character.character_class_id}</dd>
                    </div>

                    <div className="contents">
                        <dt>Race:</dt>
                        <dd className="min-w-0 break-words">{character.race_id}</dd>
                    </div>
                </dl>
            </div>
        </Link>
    )
}
