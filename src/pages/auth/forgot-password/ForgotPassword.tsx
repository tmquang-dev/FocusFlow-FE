import HeaderCard from "@/components/auth/HeaderCard";
import ForgotPasswordForm from "@/components/auth/forgotPassword/ForgotPasswordForm";
import BackButton from "@/components/common/BackButton";
function ForgotPassword() {
  return (
    <main className="min-h-screen w-full bg-background-main flex items-center justify-center">
      <div className="w-full max-w-[384px]">
        <div className="bg-background-secondary-50 rounded-xl shadow-sm border border-border w-full">
          <div className="flex flex-col items-center gap-5.5 p-10">
            {/* Header */}
            <HeaderCard
              title="Forgot Password"
              description="Enter your email address to receive a password reset code"
            />

            {/* Form */}
            <ForgotPasswordForm />
            {/* Back button */}
            <BackButton />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
