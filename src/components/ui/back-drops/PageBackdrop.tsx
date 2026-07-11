import { ReactNode } from "react"

export default function PageBackdrop({ children }: { children?: ReactNode }) {
    return (
        <div aria-hidden="true" className="fixed inset-0 w-full h-screen overflow-hidden -z-10 bg-midnight">
            { children }
        </div>
    )
}