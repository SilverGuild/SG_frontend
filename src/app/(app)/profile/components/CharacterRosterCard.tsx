import Image from 'next/image'
import Link from 'next/link'
import { CharacterType } from '@/types'

interface CharacterRosterCardProps {
    character: CharacterType
}


export default function CharacterRosterCard({ character }: CharacterRosterCardProps) { 
    const monogram = `https://ui-avatars.com/api/?name=${character.name}&size=96&background=7B9BB3`;
    const avatarSrc = monogram; // Will add conditional to handle switch between default input avatar url and a potential null

    return (
        <Link 
            href={`/character/${character.id}`}
            className="flex flex-col items-center min-w-0 rounded-2xl border border-mist/50 bg-nightveil/70 p-6 w-64 shrink-0 transition-all duration-200 hover:border-arcane/60 hover:shadow-[0_0_24px_-6px_var(--color-arcane)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lunar"
        >
            <div className="w-20 h-20 rounded-full mt-5 mb-7 overflow-hidden shrink-0 ring-2 ring-lunar/50">
                <Image src={avatarSrc} alt={character.name} width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="w-full min-w-0">
                <div className="min-h-[4.5rem] flex items-center  justify-center mb-3 px-2">
                    <h3 className="text-xl font-bold text-center break-words line-clamp-2 text-moonbeam">
                        {character.name}
                    </h3>
                </div>
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
