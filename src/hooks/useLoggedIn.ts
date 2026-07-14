'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function useLoggedIn() {
    const pathname = usePathname()
    const [ loggedIn, setLoggedIn ] = useState(false)

    useEffect(() => {
        setLoggedIn(document.cookie.includes('sg_logged_in=1'))
    }, [pathname])

    return loggedIn
}