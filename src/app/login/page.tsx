import LoginForm from './components/LoginForm'

export default async function Login({
    searchParams,
}: {
    searchParams: Promise<{ logoutIssue?: string; accountCreated?: string }>
}) {
    const { logoutIssue, accountCreated } = await searchParams

    return (
        <div>
            <h2>Log in to SilverGuild</h2>
            { logoutIssue && (
                <p role="alert" className="">
                    We could&apot;t confirm your session fully ended. If you&apos;re on a shared device, please close all browser windows o be safe.
                </p>
            )}
            { accountCreated && (
                <p role="alert" className="">
                    Account created! Please log in to continue.
                </p>
            )}
            <LoginForm />
        </div>
    )
}