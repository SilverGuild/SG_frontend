import { useData } from '@/app/providers/DataProvider';
import ProfileDetails from './components/ProfileDetails';

export default function UserHome() {
    const { user, characters } = useData();

    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ProfileDetails user={user} />
      </div>
    );
  }
  