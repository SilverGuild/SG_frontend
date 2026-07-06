'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signup, login } from '@/lib/api/api'
import { isStatusError } from '@/lib/api/errors'

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
            className=""
            noValidate
        >
            <div className="">
                <label htmlFor="username" className="">Username</label>
                <input 
                    id="username" name="username" type="text" autoComplete="username" required
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    className="" disabled={pending}
                />
            </div>
            <div className="">
                <label htmlFor="email" className="">Email</label>
                <input 
                    id="email" name="email" type="email" autoComplete="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="" disabled={pending}
                />
            </div>
            <div className="">
                <label htmlFor="password" className="">Password</label>
                <input 
                    id="password" name="password" type="text" autoComplete="new-password" required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="" disabled={pending}
                />
            </div>
            <div className="">
                <label htmlFor="confirmPassword" className="">Confirm Password</label>
                <input 
                    id="confirmPassword" name="confirmPassword" type="text" autoComplete="new-password" required
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="" disabled={pending}
                />
            </div>

            {error && (
                <p role="alert" data-testid="signup-error" className="">
                    {error}
                </p>
            )}

            <button type="submit" disabled={pending} className="">
                {pending ? 'Creating account...' : 'Join'}
            </button>
        </form>
    )
}