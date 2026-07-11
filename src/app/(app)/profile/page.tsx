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
                <div className="flex items-center justify-center min-h-screen text-moonlight">
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
                <div className="flex items-center justify-center min-h-screen text-moonlight">
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
            <div className="grid grid-cols-[4fr_1fr] grid-rows-[1fr_repeat(6,1fr)] w-full min-h-screen gap-x-[15px] gap-y-4 animate-fade-in-up">
                    <div className="col-start-2 row-start-1 row-span-3 min-w-0">
                        <ProfileDetails user={user} />
                    </div>
                    <div className="col-start-1 row-start-3 row-span-4 min-w-0">
                        <CharacterRoster characters={characters} />
                    </div>
            </div>
        </>
    )
}                                               
