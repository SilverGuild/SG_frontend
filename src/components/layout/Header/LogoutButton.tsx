'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/lib/api/api'

export default function LogoutButton({ className }: { className?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const [ visible, setVisible ] = useState(false)
    const [ pending, setPending ] = useState(false)

    useEffect(() => {
        setVisible(document.cookie.includes('sg_logged_in=1'))
    }, [pathname])

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