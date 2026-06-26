interface FieldProps {
    label: string
    value?: string | number
    editable?: boolean
    onChange?: (value: string) => void
}

export default function Field({label, value, editable, onChange}: FieldProps) {
    return (
        <label>
            <span>{label}</span>
            {editable ? (
                <input className=""
                value={value ?? ''}
                onChange={(e) => onChange?.(e.target.value)}
            />
            ) : (
                <span className="">{value ?? '-'}</span>
            )}
        </label>
    )
}