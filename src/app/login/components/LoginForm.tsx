'use client'

import {useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api/api'
import { isStatusError } from '@/lib/api/errors'

const labelClass = "block text-sm text-moonlight mb-1"
const inputClass = "w-full rounded-lg border border-mist/50 bg-void/60 px-3 py-2 text-moonbeam placeholder-ashsilver focus:outline-none focus:ring-2 focus:ring-lunar focus:border-transparent transition-all duration-200 diasabled:opacity-50"

export default function LoginForm() {
    const router = useRouter()
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState<string | null>(null)
    const [ pending, setPending ] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setPending(true)

        try {
            await login(username, password)
            router.push('/profile')
        } catch (err) {
            if (isStatusError(err) && err.status == 401) {
                setError('Invalid username or password.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } finally {
            setPending(false)
        }
    }

    return (
        <form
            data-testid="login-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
        >
            <div>
                <label htmlFor="username" className={labelClass}>
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClass}
                    disabled={pending}
                />
            </div>
            <div>
                <label htmlFor="password" className={labelClass}>
                    Password
                </label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    disabled={pending}
                />
            </div>

            {error && (
                <p role="alert" data-testid="login-error" className="animate-fade-in-up text-sm text-center text-rose-300/90 bg-rose-950/30 border border-rose-800/40 rounded-lg py-2 px-3">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="relative inline-flex w-full items-center justify-center p-0.5 mt-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-lunar to-arcane transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--color-arcane)] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0"
            >
                <span className="relative block w-full px-5 py-2.5 bg-nightveil rounded-md text-center text-moonbeam group-hover:bg-transparent transition-all duration-200">
                    { pending ? 'Logging in...' : 'Log in' }
                </span>
            </button>
        </form>
    )
}