'use client'

import {useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { login, fetchCurrentUser } from '@/lib/api/api'
import { isStatusError } from '@/lib/api/errors'

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
            className=""
            noValidate
        >
            <div>
                <label htmlFor="username" className="">
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
                    className="text-white"
                    disabled={pending}
                />
            </div>
            <div>
                <label htmlFor="password" className="">
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
                    className="text-white"
                    disabled={pending}
                />
            </div>

            {error && (
                <p role="alert" data-testid="login-error" className="text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="bg-cyan-950"
            >
                { pending ? 'Logging in...' : 'Log in' }
            </button>
        </form>
    )
}