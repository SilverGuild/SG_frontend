import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from './LogoutButton'

export default function Header() {
    return (
        <header className="sticky top-0 w-full bg-transparent z-50">
            <div className="flex justify-between items-center my-4">
                <div className="basis-2/10 ml-5">
                    <Link href="/">
                        <Image className="size-28" src="/logo.svg" alt="sg_logo" width={120} height={120} priority/>
                    </Link>
                </div>
                <nav className="basis-3/10 mr-10">
                    <ul className="flex flex-row mx-auto px-6 py-3 justify-between items-center text-xl">
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link href="/character">Create</Link>
                        </li>
                        <li>
                            <Link href="">Resources</Link>
                        </li>
                        <li>
                            <LogoutButton />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
