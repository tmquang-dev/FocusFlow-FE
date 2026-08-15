import Button from "@/components/common/Button";
import { GithubIcon, GoogleIcon } from "@/components/common/Icons";

function SocialsAuth() {
  const handleSocialLogin = (provider: "GitHub" | "Google") => {
    window.alert(`Continue with ${provider} selected`);
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* GitHub */}
      <Button
        variant="primary"
        onClick={() => {
          handleSocialLogin("GitHub");
        }}
        leftIcon={<GithubIcon className="text-white w-5 h-5" />}
        className="bg-[#24292f] hover:bg-[#1c2026] active:bg-[#14181c] text-white text-xs font-semibold leading-4 tracking-[0.6px] border"
      >
        Continue with GitHub
      </Button>

      {/* Google */}
      <Button
        variant="outlined"
        onClick={() => {
          handleSocialLogin("Google");
        }}
        leftIcon={<GoogleIcon className="w-5 h-5" />}
        className="bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300 text-text-placeholder text-xs font-semibold leading-4 tracking-[0.6px]"
      >
        Continue with Google
      </Button>
    </div>
  );
}

export default SocialsAuth;
