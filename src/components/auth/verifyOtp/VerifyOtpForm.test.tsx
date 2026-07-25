import userEvent from "@testing-library/user-event";
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

import { renderWithProviders, screen, waitFor, fireEvent } from "@/utils/test-utils";
import { authServices } from "@/api/services/authServices";
import type { IApiVerifyOtpSuccess } from "@/api/services/authServices.type";
import VerifyOtpForm from "./VerifyOtpForm";

describe("VerifyOtpForm Component", () => {
    let user: ReturnType<typeof userEvent.setup>;
    const defaultEmail = "user@example.com";

    const renderVerifyOtpForm = (email = defaultEmail, type?: string) => {
        const typeQuery = type ? `&type=${type}` : "";
        return renderWithProviders(<VerifyOtpForm />, {
            initialEntries: [`/verify-otp?email=${encodeURIComponent(email)}${typeQuery}`],
        });
    };

    beforeEach(() => {
        user = userEvent.setup();
        jest.clearAllMocks();
        localStorage.clear();
        sessionStorage.clear();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        localStorage.clear();
        sessionStorage.clear();
    });

    it("should render essential form controls and resend button", () => {
        renderVerifyOtpForm();

        expect(screen.getByPlaceholderText(/enter otp/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /verify otp/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /resend/i })).toBeInTheDocument();
    });

    it("should display error on invalid OTP blur", async () => {
        renderVerifyOtpForm();

        const otpInput = screen.getByPlaceholderText(/enter otp/i);
        await user.type(otpInput, "123");
        await user.tab();

        expect(await screen.findByText(/OTP code must be 6 digits/i)).toBeInTheDocument();
    });

    it("should call authServices.verifyOtp when submitting valid 6-digit OTP in register flow", async () => {
        localStorage.setItem(`otp_resend_${defaultEmail}`, (Date.now() + 60000).toString());

        const verifySpy = jest.spyOn(authServices, "verifyOtp").mockResolvedValueOnce({
            status: "success",
            data: {
                registration_token: "mock-reg-token",
            },
        });

        renderVerifyOtpForm();

        const otpInput = screen.getByPlaceholderText(/enter otp/i);
        await user.type(otpInput, "123456");

        const submitBtn = screen.getByRole("button", { name: /verify otp/i });
        fireEvent.submit(submitBtn);

        await waitFor(() => {
            expect(verifySpy).toHaveBeenCalledWith({
                email: defaultEmail,
                code: "123456",
            });
            expect(sessionStorage.getItem("registration_token")).toBe("mock-reg-token");
        });

        await waitFor(() => {
            expect(localStorage.getItem(`otp_resend_${defaultEmail}`)).toBeNull();
        }, { timeout: 1000 });
    });

    it("should call authServices.verifyPasswordOtp when type is reset_password", async () => {
        const verifyPasswordSpy = jest.spyOn(authServices, "verifyPasswordOtp").mockResolvedValueOnce({
            status: "success",
            data: {
                reset_token: "mock-reset-token",
            },
        });

        renderVerifyOtpForm(defaultEmail, "reset_password");

        const otpInput = screen.getByPlaceholderText(/enter otp/i);
        await user.type(otpInput, "654321");

        const submitBtn = screen.getByRole("button", { name: /verify otp/i });
        fireEvent.submit(submitBtn);

        await waitFor(() => {
            expect(verifyPasswordSpy).toHaveBeenCalledWith({
                email: defaultEmail,
                code: "654321",
            });
            expect(sessionStorage.getItem("reset_token")).toBe("mock-reset-token");
        });
    });

    it("should disable submit button while request is pending", async () => {
        let resolvePromise: ((value: IApiVerifyOtpSuccess) => void) | undefined;
        const pendingPromise = new Promise<IApiVerifyOtpSuccess>((resolve) => {
            resolvePromise = resolve;
        });

        jest.spyOn(authServices, "verifyOtp").mockReturnValueOnce(pendingPromise);

        renderVerifyOtpForm();

        await user.type(screen.getByPlaceholderText(/enter otp/i), "123456");
        const submitBtn = screen.getByRole("button", { name: /verify otp/i });

        fireEvent.submit(submitBtn);

        await waitFor(() => {
            expect(submitBtn).toBeDisabled();
        });

        if (resolvePromise) {
            resolvePromise({
                status: "success",
                data: { registration_token: "mock-reg-token" },
            });
        }
    });
});
