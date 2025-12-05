import Link from 'next/link'

export default function Header() {
    return (
        <header className="fixed top-0 w-full bg-black shadow-lg z-50">
            <div className="flex justify-between items-center my-4">
                <div className="basis-2/10 ml-10">
                    {/*  eslint-disable-next-line @next/next/no-img-element */}
                    <Link href="/">
                        <img className="size-28" src="/logo.svg" alt="sg_logo" />
                    </Link>
                </div>
                <nav className="basis-3/10 mr-10">
                    <ul className="flex flex-row mx-auto px-6 py-3 justify-between items-center text-xl">
                        <li>
                            {/* Either About or Resources -> add Resources? */}
                            <Link href="">About</Link>
                        </li>
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link href="/character">Create</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
