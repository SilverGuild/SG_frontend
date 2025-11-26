import { User } from '@/types/user';

interface ProfileDetailsProps {
    user: User;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    return (
        <div className="flex flex-col items-center flex-1 bg-cyan-950 m-4 p-4 rounded-lg"> 
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 overflow-hidden"> 
                {/*  eslint-disable-next-line @next/next/no-img-element */}
               <img src={""} alt={ user.username }/>
            </div>
            <dl>
                <dt>Username:</dt>
                <dd>{ user.username }</dd>

                <dt>Email:</dt>
                <dd>{ user.email }</dd>
            </dl>
        </div>
    );
}