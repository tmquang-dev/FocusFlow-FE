import HeaderCard from "@/components/auth/HeaderCard";
import VerifyOtpForm from "@/components/auth/verifyOtp/VerifyOtpForm";
import BackButton from "@/components/common/BackButton";

function VerifyOtp() {
  return (
    <div className="min-h-screen w-full bg-background-main flex items-center justify-center">
      <div className="w-full max-w-[384px]">
        {/* Login Card */}
        <div className="bg-background-secondary-50 rounded-xl shadow-sm border border-border w-full">
          <div className="flex flex-col items-center gap-5.5 p-10">
            {/* Header */}
            <HeaderCard
              title="Verify OTP"
              description={`Please enter the verification code sent to`}
            />

            {/* Form */}
            <VerifyOtpForm />
            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
