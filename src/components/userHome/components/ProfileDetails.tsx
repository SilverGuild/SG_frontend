import { User } from '@/types/user';

interface ProfileDetailsProps {
    user: User | null;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    if (!user) {
        return <div>No user data available!</div> // Receive error from back end display
    }
    
    return (
        <div> 
            <div> 
               <img alt={ user.username }/>
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