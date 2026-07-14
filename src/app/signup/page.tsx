import SignUpForm from "./components/SignUpForm"
import { AuthCard, MoonGlow, PageBackdrop, StarField } from "@/components"

export default function SignUp() {
    return (
        <>
            <PageBackdrop>
                <StarField />
                <MoonGlow />
            </PageBackdrop>
            <AuthCard title="Join the Guild">
                <SignUpForm />
            </AuthCard>
        </>
    )
}