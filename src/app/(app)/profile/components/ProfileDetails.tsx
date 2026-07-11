import Image from 'next/image'
import { User } from '@/types'

interface ProfileDetailsProps {
    user: User
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    return (
        <div 
            data-testid="profile-details" 
            className="flex flex-col items-center justify-evenly py-10 gap-y-5 rounded-2xl border border-mist/50 bg-nightveil/80 backdrop-blur-md shadow=[0_0_30px_-10px_var(--color-lunar)]"
        >
            <div className="w-28 h-28 rounded-full overflow-hidden mt-10 ring-2 ring-lunar/60 shadow=[0_0_20px_-4px_var(--color-arcane)]">
                <Image 
                    data-testid="profile-avatar"
                    src={`https://ui-avatars.com/api/?name=${user.username}&size=128&background=7B9BB3`}
                    alt={user.username}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                />
            </div> 
            <div>
                <div className="text-4xl py-7 capitalize text-moonbeam [text-shadow:_0_0_16px_var(--color-lunar)]">
                    <h3>{`${user.username}`}</h3> 
                    {/* Add drop down here to display user's detailed informatiom (e.g. email, etc.) */}
                </div>
            </div>
        </div>
    )
}
