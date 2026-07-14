interface SectionProps {
    label?: string
    className?: string
    children: React.ReactNode
}

export default function Section({label = '', className = '', children }: SectionProps) {
    return (
        <div className={`rounded-2xl border border-mist/50 bg-nightveil/60 backdrop-blur-md p-4 ${className}`}>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-ashsilver mb-3">
                {label}
            </h2>
            {children}
        </div>
    )
}