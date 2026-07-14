'use client'

import { useData } from '@/app/providers/DataContextProvider'
import { MoonGlow, PageBackdrop, StarField } from '@/components'
import ProfileDetails from './components/ProfileDetails'
import CharacterRoster from './components/CharacterRoster'

export default function Profile() {
    const { user, characters, loading } = useData()

    if (loading) {
        return (
            <>
                <PageBackdrop>
                    <MoonGlow />
                </PageBackdrop>
                <div className="flex items-center justify-center min-h-full text-moonlight">
                    Loading...
                </div>
            </>
        )
    }

    if (!user) {
        return (
            <>
                <PageBackdrop>
                    <MoonGlow />
                </PageBackdrop>
                <div className="flex items-center justify-center min-h-full text-moonlight">
                    No User Found!
                </div>
            </>
        )
    }

    return (
        <> 
            <PageBackdrop>
                <StarField />
                <MoonGlow />
            </PageBackdrop>
            <div className="flex w-full min-h-full gap-[15px] animate-fade-in-up">
                    <div className="flex-1 min-w-0 flex justify-center items-center">
                        <CharacterRoster characters={characters} />
                    </div>
                    <div className="w-72 shrink-0">
                        <ProfileDetails user={user} />
                    </div>
            </div>
        </>
    )
}                                               
