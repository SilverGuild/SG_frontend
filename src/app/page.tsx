import StarField from '@/components/ui/StarField'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen h-screen max-h-screen overflow-hidden fixed inset-0 w-full mt-0 flex flex-col justify-center align-items bg-midnight">
            <StarField />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-twilight)_0%,_transparent_60%)] opacity-50" />
            <div className=" relative z-10 flex flex-col justify-center align-items">
                <h1 className="text-8xl text-center title-font text-moonbeam [text-shadow:_0_0_30px_var(--color-lunar)] animate-fade-in-up">SilverGuild</h1>
                <div className="flex justify-evenly align-items space-between mt-[3em] animate-fade-in-up [animation-delay:150ms]">
                    <Link 
                        href="/login"
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-lunar to-arcane transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--color-arcane)] hover:-translate-y-0.5"
                    >
                        <span className="relative px-5 py-2.5 bg-nightveil rounded-md text-moonbeam group-hover:bg-transparent transition-all duration-200">
                            Enter the Guild
                        </span>
                    </Link>
                    <Link
                        href="/signup" 
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-lunar to-arcane transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_2-px_-4px_var(--color-arcane)] hover:-translate-y-0.5"
                    >
                        <span className="relative px-5 py-2.5 bg-nightveil rounded-md text-moonbeam group-hover:bg-transparent transition-all duration-200">
                            Join the Guild
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
