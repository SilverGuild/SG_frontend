import SignUpForm from "./components/SignUpForm"
import AuthCard from "@/components/ui/AuthCard"

export default function SignUp() {
    return (
        <AuthCard title="Join the Guild">
            <SignUpForm />
        </AuthCard>
    )
}