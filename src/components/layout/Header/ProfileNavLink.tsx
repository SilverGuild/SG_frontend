import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProfileNavLink({ className }: { className?: string }) {
    const pathname = usePathname()
    const [ visible, setVisible ] = useState(false)

    useEffect(() => {
        setVisible(document.cookie.includes('sg_logged_in=1'))
    }, [pathname])

    if (!visible) return null

    return (
         <Link href="/profile" className={className}>Profile</Link>
    )
}