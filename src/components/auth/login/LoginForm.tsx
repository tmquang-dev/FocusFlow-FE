import { useState } from "react";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { EyeIcon, EyeOffIcon, GithubIcon, GoogleIcon } from "@/components/common/Icons";

function LoginForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();


    };

    const handleSocialLogin = (provider: "GitHub" | "Google") => {
        window.alert(`Continue with ${provider} selected`);
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center w-full">

            {/* Email field */}
            <InputField
                label="Email"
                id="input-1"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
                required
            />

            {/* Password field */}
            <InputField
                label="Password"
                id="input-2"
                name="password"
                placeholder="••••••••"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                rightIcon={
                    <button
                        type="button"
                        onClick={() => { setIsPasswordVisible(!isPasswordVisible); }}
                        className="text-text-secondary hover:text-text-main transition-colors cursor-pointer flex items-center justify-center border-none bg-transparent focus:outline-none"
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    >
                        {isPasswordVisible ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                }
            />

            {/* Submit button */}
            <Button variant="primary" type="submit" className="w-full">
                Log In
            </Button>

            {/* Forgot password */}
            <div className="flex justify-end w-full">
                <a
                    href="#forgot-password"
                    className="text-primary-600 font-text-medium hover:underline cursor-pointer"
                >
                    Forgot password?
                </a>
            </div>

            {/* Separator */}
            <div className="flex items-center w-full gap-0 py-2.5">
                <div className="flex-1 h-px bg-border" />
                <span className="px-3 text-xs leading-[16px] text-text-placeholder">Or</span>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social auth */}
            <div className="flex flex-col gap-4 w-full">
                {/* GitHub */}
                <Button
                    variant="primary"
                    onClick={() => { handleSocialLogin("GitHub"); }}
                    leftIcon={<GithubIcon className="text-white w-5 h-5" />}
                    className="bg-[#24292f] hover:bg-[#1c2026] active:bg-[#14181c] text-white text-xs font-semibold leading-4 tracking-[0.6px] border"
                >
                    Continue with GitHub
                </Button>

                {/* Google */}
                <Button
                    variant="outlined"
                    onClick={() => { handleSocialLogin("Google"); }}
                    leftIcon={<GoogleIcon className="w-5 h-5" />}
                    className="bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300 text-text-placeholder text-xs font-semibold leading-4 tracking-[0.6px]"
                >
                    Continue with Google
                </Button>
            </div>

            {/* Sign up link */}
            <div className="flex items-center justify-center gap-1 py-0.5 w-full">
                <span className="text-text-secondary font-text-medium">New FocusFlow account?</span>
                <a
                    href="#create-account"
                    className="text-primary-600 font-text-medium hover:underline cursor-pointer"
                >
                    Create an account
                </a>
            </div>
        </form>
    )
}

export default LoginForm