'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signup, login } from '@/lib/api/api'
import { isStatusError } from '@/lib/api/errors'

const labelClass = "block text-sm text-moonlight mb-1"
const inputClass = "w-full rounded-lg border border-mist/50 bg-void/60 px-3 py-2 text-moonbeam placeholder-ashsilver focus:outline-none focus:ring-2 focus:ring-lunar focus:border-transparent transition-all duration-200 diasabled:opacity-50"

export default function SignUpForm() {
    const router = useRouter()
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ error, setError ] = useState<string | null>(null)
    const [ pending, setPending ] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setPending(true)

        try {
            await signup({ username, email, password, passwordConfirmation: confirmPassword})

            try {
                await login(username, password)
                router.push('/profile')
            } catch (loginErr) {
                console.error('Auto-login after signup failed:', loginErr)
                router.push('/login?accountCreated=1')
            }
        } catch (err) {
            setError(isStatusError(err) ? err.message : 'Something went wrong')
        } finally {
            setPending(false)
        }
    }

    return (
        <form
            data-testid="signup-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
        >
            <div>
                <label htmlFor="username" className={labelClass}>Username</label>
                <input 
                    id="username" name="username" type="text" autoComplete="username" required
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    className={inputClass} disabled={pending}
                />
            </div>
            <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input 
                    id="email" name="email" type="email" autoComplete="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className={inputClass} disabled={pending}
                />
            </div>
            <div>
                <label htmlFor="password" className={labelClass}>Password</label>
                <input 
                    id="password" name="password" type="password" autoComplete="new-password" required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className={inputClass} disabled={pending}
                />
            </div>
            <div className="">
                <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
                <input 
                    id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass} disabled={pending}
                />
            </div>

            {error && (
                <p role="alert" data-testid="signup-error" className="animate-fade-in-up text-sm text-center text-rose-300/90 bg-rose-950/30 border border-rose-800/40 rounded-lg py-2 px-3">
                    {error}
                </p>
            )}

            <button type="submit" disabled={pending} className="relative inline-flex w-full items-center justify-center p-0.5 mt-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-lunar to-arcane transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_-4px_var(--color-arcane)] hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0">
                <span className="relative block w-full px-5 py-2.5 bg-nightveil rounded-md text-center text-moonbeam group-hover:bg-transparent transition-all duration-200">

                    {pending ? 'Creating account...' : 'Join'}
                </span>
            </button>
        </form>
    )
}