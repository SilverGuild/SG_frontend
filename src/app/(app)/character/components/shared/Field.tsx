'use client'

interface FieldProps {
    label: string
    value?: string | number
    editable?: boolean
    onChange?: (value: string) => void
}

export default function Field({label, value, editable, onChange}: FieldProps) {
    return (
        <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-ashsilver">{label}</span>
            {editable ? (
                <input className="rounded-md border border-mist/60 bg-midnight/60 px-2 py-1 text-moonbeam focus:outerline-none focus:ring-2 focus:ring-lunar"
                value={value ?? ''}
                onChange={(e) => onChange?.(e.target.value)}
            />
            ) : (
                <span className="text-moonlight">{value ?? '-'}</span>
            )}
        </label>
    )
}