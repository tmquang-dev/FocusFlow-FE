import { useSearchParams } from "react-router";
import HeaderCard from "@/components/auth/HeaderCard";
import CreatePasswordForm from "@/components/auth/createPassword/CreatePasswordForm";
import BackButton from "@/components/common/BackButton";

function CreatePassword() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") ?? "register";
  const isReset = type === "reset_password";

  return (
    <main className="min-h-screen w-full bg-background-main flex items-center justify-center">
      <div className="w-full max-w-[384px]">
        <div className="bg-background-secondary-50 rounded-xl shadow-sm border border-border w-full">
          <div className="flex flex-col items-center gap-5.5 p-10">
            {/* Header */}
            <HeaderCard
              title={isReset ? "Reset Password" : "Create Password"}
              description={
                isReset
                  ? "Enter your new password below."
                  : "Choose a strong password to protect your account."
              }
            />

            {/* Form */}
            <CreatePasswordForm />

            {/* Navigation */}
            <BackButton />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreatePassword;
