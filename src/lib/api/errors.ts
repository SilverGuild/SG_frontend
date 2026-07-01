export function isStatusError(err: unknown): err is Error & { status: number } {
    return err instanceof Error && typeof (err as { status?: unknown }).status === 'number'
}