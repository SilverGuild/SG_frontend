type LayerConfig = {
    key: string
    seed: number
    count: number
    size: [number, number]
    opacity: [number, number]
    riseDuration: [number, number]
    drift: number
    pulseDuration: [number, number]
    colors: [string, string]
} & (
    | { trail: true, trailLength: [number, number] }
    | { trail: false, trailLength?: never }
)

const PALETTE ={
    moonbeam: '#eceff6',
    ashsilver: '#8a93a8',
    moonlight: '#c6cedd',
    lunar: '#7b9bb3',
    arcane: '#9e86c9',
    starlight: '#d8c68c',
}

const LAYERS: LayerConfig[] = [
    {
        key:'far', seed: 1, count: 100, size: [1.5, 1.75], opacity: [0.35, 0.5], riseDuration: [50, 75], drift: 3, pulseDuration: [4, 5], colors: [PALETTE.moonbeam, PALETTE.ashsilver], trail: false
    },
    {
        key:'mid', seed: 2, count: 52, size: [1.75, 2.5], opacity: [0.6, 0.8], riseDuration: [120, 140], drift: 10, pulseDuration: [3.5, 5.5], colors: [PALETTE.moonlight, PALETTE.lunar], trail: true, trailLength: [4, 8]
    },
    {
        key:'near', seed: 3, count: 26, size: [2.5, 3.5], opacity: [0.85, 1], riseDuration: [170, 220], drift: 18, pulseDuration: [2, 3.5], colors: [PALETTE.arcane, PALETTE.starlight], trail: true, trailLength: [10 , 15]
    },
]

const TWINKLE_COUNT = 35
const TWINKLE_SEED = 4

// Deterministic seeded PRNG - same output every render, server and client
function mulberry32(seed: number) {
    return function () {
        seed |= 0
        seed = (seed + 0x6d2b79f5) | 0
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return (( t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function lerp(min: number, max: number, t: number) {
    return min + (max - min) * t
}

function generateParticles(layer: LayerConfig) {
    const rand = mulberry32(layer.seed)
    return Array.from({ length: layer.count }).map(() => {
        const size = lerp(layer.size[0], layer.size[1], rand())
        return {
            x: rand() * 100,
            y: rand() * 140 - 20,
            size,
            opacity: lerp(layer.opacity[0], layer.opacity[1], rand()),
            riseDuration: lerp(layer.riseDuration[0], layer.riseDuration[1], rand()),
            riseDelay: rand() * -layer.riseDuration[1],
            drift: layer.drift * lerp(0.7, 1.3, rand()),
            pulseDuration: lerp(layer.pulseDuration[0], layer.pulseDuration[1], rand()),
            pulseDelay: rand() * -layer.pulseDuration[1],
            color: rand() > 0.5 ? layer.colors[0] : layer.colors[1],
            trailLength: layer.trailLength ? lerp(layer.trailLength[0], layer.trailLength[1], rand()) : null
        }
    })
}

export default function StarField() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"> 
            {LAYERS.map((layer) => {
                const particles = generateParticles(layer)
                return particles.map((p, i) => (
                    <div 
                        key={`${layer.key}-${i}`}
                        className="sg-particle absolute"
                        style={
                            {
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                width: p.size - 0.1,
                                height: p.size,
                                '--drift': p.drift,
                                '--base-opacity': p.opacity,
                                animation: `sg-rise-drift ${p.riseDuration}s ease-in-out ${p.riseDelay}s infinite, sg-pulse ${p.pulseDuration}s ease-in-out ${p.pulseDelay}s infinite`
                            } as React.CSSProperties
                        }
                    >  
                        {p.trailLength !== null && (
                            <span 
                                className="absolute left-1/2 top-ful -translate-x-1/2 rounded-full"
                                style={{
                                    width: p.size * 0.9,
                                    height: p.size * p.trailLength,
                                    background: `linear-gradient(to bottom, ${p.color}, transparent)`,
                                }}
                            />
                        )}
                        <span 
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color,
                                boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
                            }}
                        />
                    </div>
                ))
            })}
        </div> 
    )
}