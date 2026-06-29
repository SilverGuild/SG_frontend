import Image from 'next/image'
import { User } from '@/types/user'

interface ProfileDetailsProps {
    user: User
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    return (
        <div data-testid="profile-details" className="flex flex-col items-center justify-evenly bg-gray-800 py-10 gap-y-5">
            <div className="w-28 h-28 rounded-full overflow-hidden mt-10">
                <Image 
                    data-testid="profile-avatar"
                    src={`https://ui-avatars.com/api/?name=${user.username}&size=128&background=7B9BB3`}
                    alt={user.username}
                    width={128}
                    height={128}
                    priority
                />
            </div> 
            <div>
                <div className="text-4xl py-7 capitalize">
                    <h3>{`${user.username}`}</h3> 
                    {/* Add drop down here to display user's detailed informatiom (e.g. email, etc.) */}
                </div>
            </div>
        </div>
    )
}
