'use client'

import { useData } from '@/app/providers/DataContextProvider'
import ProfileDetails from './components/ProfileDetails'
import CharacterRoster from './components/CharacterRoster'

export default function UserHome() {
    const { user, characters, loading } = useData()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <div>No user found!</div> // Receive error from back end display
    }

    return (
        <div className="grid grid-cols-[4fr_1fr] grid-rows-[1fr_repeat(6,1fr)] w-full min-h-screen gap-x-[15px] gap-y-4">
                <div className="col-start-2 row-start-1 row-span-3 min-w-0">
                    <ProfileDetails user={user} />
                </div>
                <div className="col-start-1 row-start-3 row-span-4 min-w-0">
                    <CharacterRoster characters={characters} />
                </div>
        </div>
    )
}                                               
