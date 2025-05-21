export default function Header() {
    return (
        <header className="fixed top-0 w-full bg-transparent shadow-lg z-50">
            <div className="flex justify-between items-center my-10">
                <div className="basis-2/10 ml-10">
                    <a href=""><img className="size-32" src="/logo.svg"/></a>
                </div>
                <nav className="basis-3/10 mr-10">
                    <ul className="flex flex-row mx-auto px-6 py-3 justify-between items-center text-xl">
                        <li>
                            About
                        </li>
                        <li>
                            Profile
                        </li>
                        <li>
                            Create
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}