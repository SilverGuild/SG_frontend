'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api/api'
import { useLoggedIn } from '@/hooks/useLoggedIn'

export default function LogoutButton({ className }: { className?: string }) {
    const router = useRouter()
    const visible = useLoggedIn()
    const [ pending, setPending ] = useState(false)

    async function handleLogout() {
        setPending(true)
        try {
            await logout()
            router.push('/login')
        } catch (err) {
            console.log('Logout failed, ', err)
            router.push('login?logoutIssue=1')
        } finally {
            setPending(false)
        }
    }

    if (!visible) return null

    return (
        <button type="button" onClick={handleLogout} disabled={pending} className={className}>
            {pending ? 'Logging out...' : 'Logout'}
        </button>
    )
}