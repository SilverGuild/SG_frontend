'use client'

interface CheckboxProps {
    label: string,
    checked: boolean,
    editable?: boolean,
    onChange?: (checked: boolean) => void
}

export default function Checkbox({ label, checked, editable = false, onChange }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2 text-sm text-moonlight">
            <input 
                type="checkbox"
                checked={checked}
                disabled={!editable}
                onChange={(e) => onChange?.(e.target.checked)}
                className="h-4 w-4 rounded border-mist/60 bg-midnight/60 accent-lunar focus:outline-none focus:ring-2 focus:ring-lunar disabled:opacity-50"   
            />
            <span>{label}</span>
        </label>
    )
}