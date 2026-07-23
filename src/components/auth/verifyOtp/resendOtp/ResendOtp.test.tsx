import userEvent from "@testing-library/user-event";
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

import { renderWithProviders, screen, waitFor } from "@/utils/test-utils";
import { authServices } from "@/api/services/authServices";
import ResendOtp from "./ResendOtp";

describe("ResendOtp Component", () => {
    let user: ReturnType<typeof userEvent.setup>;
    const defaultEmail = "test@example.com";
    const mockSetResponseMessage = jest.fn();

    beforeEach(() => {
        user = userEvent.setup();
        jest.clearAllMocks();
        localStorage.clear();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        localStorage.clear();
    });

    it("should default to 60-second cooldown on initial navigation (no localStorage item)", () => {
        renderWithProviders(
            <ResendOtp email={defaultEmail} setResponseMessage={mockSetResponseMessage} />
        );

        const resendBtn = screen.getByRole("button", { name: /resend/i });
        expect(resendBtn).toBeDisabled();
        expect(resendBtn).toHaveTextContent(/Resend \(60\)/);
    });

    it("should render active countdown if future availableAt is stored in localStorage", () => {
        const futureTime = Date.now() + 30 * 1000;
        localStorage.setItem(`otp_resend_${defaultEmail}`, futureTime.toString());

        renderWithProviders(
            <ResendOtp email={defaultEmail} setResponseMessage={mockSetResponseMessage} />
        );

        const resendBtn = screen.getByRole("button", { name: /resend/i });
        expect(resendBtn).toBeDisabled();
        expect(resendBtn).toHaveTextContent(/Resend \(30\)/);
    });

    it("should render enabled resend button when availableAt timestamp in localStorage is in the past", () => {
        const pastTime = Date.now() - 1000;
        localStorage.setItem(`otp_resend_${defaultEmail}`, pastTime.toString());

        renderWithProviders(
            <ResendOtp email={defaultEmail} setResponseMessage={mockSetResponseMessage} />
        );

        const resendBtn = screen.getByRole("button", { name: /resend/i });
        expect(resendBtn).not.toBeDisabled();
        expect(resendBtn).toHaveTextContent("Resend");
    });

    it("should call authServices.resendOtp on click when enabled and start new cooldown in localStorage", async () => {
        const pastTime = Date.now() - 1000;
        localStorage.setItem(`otp_resend_${defaultEmail}`, pastTime.toString());

        const resendSpy = jest.spyOn(authServices, "resendOtp").mockResolvedValueOnce({
            status: "success",
            message: "OTP resent successfully",
        });

        renderWithProviders(
            <ResendOtp email={defaultEmail} setResponseMessage={mockSetResponseMessage} />
        );

        const resendBtn = screen.getByRole("button", { name: /resend/i });
        await user.click(resendBtn);

        await waitFor(() => {
            expect(resendSpy).toHaveBeenCalledWith({ email: defaultEmail });
            expect(mockSetResponseMessage).toHaveBeenCalledWith({
                message: "OTP resent successfully",
                type: "success",
            });
            expect(localStorage.getItem(`otp_resend_${defaultEmail}`)).toBeTruthy();
        });
    });

    it("should display server error response when resendOtp API fails", async () => {
        const pastTime = Date.now() - 1000;
        localStorage.setItem(`otp_resend_${defaultEmail}`, pastTime.toString());

        jest.spyOn(authServices, "resendOtp").mockRejectedValueOnce({
            isAxiosError: true,
            response: { data: { message: "Too many requests", status: "error" } },
        });

        renderWithProviders(
            <ResendOtp email={defaultEmail} setResponseMessage={mockSetResponseMessage} />
        );

        const resendBtn = screen.getByRole("button", { name: /resend/i });
        await user.click(resendBtn);

        await waitFor(() => {
            expect(mockSetResponseMessage).toHaveBeenCalledWith({
                message: "Too many requests",
                type: "error",
            });
        });
    });
});
