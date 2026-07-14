'use client'

import Link from 'next/link'
import { useLoggedIn } from '@/hooks/useLoggedIn'

export default function ProfileNavLink({ className }: { className?: string }) {
    const visible = useLoggedIn()
    
    if (!visible) return null

    return (
         <Link href="/profile" className={className}>Profile</Link>
    )
}