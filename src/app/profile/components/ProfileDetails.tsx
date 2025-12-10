import Image from 'next/image'
import { User } from '@/types/user'

interface ProfileDetailsProps {
    user: User
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    return (
        <div data-testid="profile-details" className="flex items-center bg-gray-800 m-2 p-5 rounded-lg w-1/3">
            <div className="w-16 h-16 rounded-full mr-2 mb-4 overflow-hidden shrink-0">
               <Image 
                    data-testid="profile-avatar"
                    src={`https://ui-avatars.com/api/?name=${user.username}&size=64&background=random`}
                    alt={user.username}
                    width={120}
                    height={120}
                    priority
                />
            </div>
            <dl>
                <dt>Username:</dt>
                <dd>{user.username}</dd>

                <dt>Email:</dt>
                <dd>{user.email}</dd>
            </dl>
        </div>
    )
}
