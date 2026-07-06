const STARS = Array.from({ length: 50 }).map((_, i) => ({
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    size: (i % 3) + 1,
    delay: (i % 10) * 0.3,
    duration: 2.5 + (i % 5) * 0.4,
}))

export default function StarField() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"> 
            {STARS.map((s, i) => (
                <span 
                    key={i}
                    className="absolute rounded-full bg-moonbeam animate-twinkle"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size,
                        height: s.size,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`
                    }}
                />
            ))}
        </div>
    )
}