'use client'

import { useData } from '@/app/providers/DataProvider'
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
        <div className="flex w-full gap-4">
            <h1 className="whitespace-nowrap text-gray-900">Profile</h1>
            <div className="flex justify-around items-center w-full h-screen">
                <ProfileDetails user={user} />
                <CharacterRoster characters={characters} />
            </div>
        </div>
    )
}
