import { PageBackdrop, MoonGlow, StarField }from '@/components'
import Link from 'next/link'

const AccountLinkClass = "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-lunar to-arcane transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--color-arcane)] hover:-translate-y-0.5"
const AccountTextClass = "relative px-5 py-2.5 bg-nightveil rounded-md text-moonbeam group-hover:bg-transparent transition-all duration-200"

export default function Home() {
    return (
        <>
            <PageBackdrop>
                <StarField />
                <MoonGlow />
            </PageBackdrop>
            <div className="fixed inset-0 w-full overflow-hidden flex flex-col justify-center items-center">
                <h1 className="text-8xl text-center title-font text-moonbeam [text-shadow:_0_0_30px_var(--color-lunar)] animate-fade-in-up">SilverGuild</h1>
                <div className="flex justify-evenly items-center gap-20 mt-[3em] animate-fade-in-up [animation-delay:150ms]">
                    <Link 
                        href="/login"
                        className={ AccountLinkClass }
                    >
                        <span className={ AccountTextClass} >
                            Enter the Guild
                        </span>
                    </Link>
                    <Link
                        href="/signup" 
                        className={ AccountLinkClass }
                    >
                        <span className={ AccountTextClass } >
                            Join the Guild
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}
