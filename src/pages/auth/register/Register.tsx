import HeaderCard from "@/components/auth/HeaderCard"
import RegisterForm from "@/components/auth/register/RegisterForm"

function Register() {
    return (
        <div className="min-h-screen w-full bg-background-main flex items-center justify-center">
            <div className="w-full max-w-[384px]">
                {/* Login Card */}
                <div className="bg-background-secondary-50 rounded-xl shadow-sm border border-border w-full">
                    <div className="flex flex-col items-center gap-5.5 p-10">

                        {/* Header */}
                        <HeaderCard title="Register" description="A quiet, distraction-free Kanban board for solo developers." />

                        {/* Form */}
                        <RegisterForm />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register