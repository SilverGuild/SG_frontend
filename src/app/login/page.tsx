import LoginForm from './components/LoginForm'
import AuthCard from '@/components/ui/AuthCard'

export default async function Login({
    searchParams,
}: {
    searchParams: Promise<{ logoutIssue?: string; accountCreated?: string }>
}) {
    const { logoutIssue, accountCreated } = await searchParams

    return (
        <AuthCard title="Log in to SilverGuild">
            { logoutIssue && (
                <p role="alert" className="">
                    We couldn&apos;t confirm your session fully ended. If you&apos;re on a shared device, please close all browser windows to be safe.
                </p>
            )}
            { accountCreated && (
                <p role="status" className="">
                    Account created! Please log in to continue.
                </p>
            )}
            <LoginForm />
        </AuthCard>
    )
}