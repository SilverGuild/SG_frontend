import { ReactNode } from 'react'

export default function AuthCard({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="fixed inset-0 w-full overflow-y-auto flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-fade-in-up rounded-2xl border border-mist/50 bg-nightveil/80 backdrop-blur-md shadow-[0_0_40px_-8px_var(--color-arcane)] p-8">
                <h2 className="title-font text-4xl text-center text-moonbeam mb-8 [text-shadow:_0_0_20px_var(--color-lunar)]">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    )
}