import userEvent from "@testing-library/user-event";
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

import { renderWithProviders, screen, waitFor, fireEvent } from "@/utils/test-utils";
import { authServices } from "@/api/services/authServices";
import CreatePasswordForm from "./CreatePasswordForm";

describe("CreatePasswordForm Component", () => {
    let user: ReturnType<typeof userEvent.setup>;
    const defaultToken = "test-registration-token-123";

    beforeEach(() => {
        user = userEvent.setup();
        jest.clearAllMocks();
        sessionStorage.setItem("registration_token", defaultToken);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        sessionStorage.clear();
    });

    it("should render essential password form controls", () => {
        renderWithProviders(<CreatePasswordForm />);

        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
    });

    it("should toggle password and confirm password visibility when clicking eye buttons", async () => {
        renderWithProviders(<CreatePasswordForm />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmInput = screen.getByLabelText(/^confirm password$/i);

        expect(passwordInput).toBeInTheDocument();
        expect(confirmInput).toBeInTheDocument();

        expect((passwordInput as HTMLInputElement).type).toBe("password");
        expect((confirmInput as HTMLInputElement).type).toBe("password");

        const togglePassBtn = screen.getByRole("button", { name: /show password/i });
        await user.click(togglePassBtn);
        expect((passwordInput as HTMLInputElement).type).toBe("text");

        const toggleConfirmBtn = screen.getByRole("button", { name: /show confirm password/i });
        await user.click(toggleConfirmBtn);
        expect((confirmInput as HTMLInputElement).type).toBe("text");
    });

    it("should display validation error when password is less than 8 characters", async () => {
        renderWithProviders(<CreatePasswordForm />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        await user.type(passwordInput, "123");
        await user.tab();

        expect(await screen.findByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
    });

    it("should display error when confirm password does not match password", async () => {
        renderWithProviders(<CreatePasswordForm />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmInput = screen.getByLabelText(/^confirm password$/i);

        await user.type(passwordInput, "Password123!");
        await user.type(confirmInput, "DifferentPass!");
        await user.tab();

        expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    it("should call authServices.completeRegister when submitting valid matching passwords in register flow", async () => {
        const completeSpy = jest.spyOn(authServices, "completeRegister").mockResolvedValueOnce({
            status: "success",
            data: {
                user: {
                    id: "user-id-1",
                    email: "test@example.com",
                    full_name: "test.user",
                },
            },
        });

        renderWithProviders(<CreatePasswordForm />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmInput = screen.getByLabelText(/^confirm password$/i);

        await user.type(passwordInput, "Password123!");
        await user.type(confirmInput, "Password123!");

        const submitBtn = screen.getByRole("button", { name: /create account/i });
        fireEvent.submit(submitBtn);

        await waitFor(() => {
            expect(completeSpy).toHaveBeenCalledWith(
                {
                    password: "Password123!",
                    confirm_password: "Password123!",
                },
                defaultToken
            );
        });
    });

    it("should call authServices.resetPassword when submitting valid matching passwords in reset_password flow", async () => {
        const resetToken = "test-reset-token-456";
        sessionStorage.setItem("reset_token", resetToken);

        const resetSpy = jest.spyOn(authServices, "resetPassword").mockResolvedValueOnce({
            status: "success",
            message: "Password reset successfully",
        });

        renderWithProviders(<CreatePasswordForm />, {
            initialEntries: ["/create-password?type=reset_password"],
        });

        expect(screen.getByRole("button", { name: /reset password/i })).toBeInTheDocument();

        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmInput = screen.getByLabelText(/^confirm password$/i);

        await user.type(passwordInput, "NewSecurePassword123!");
        await user.type(confirmInput, "NewSecurePassword123!");

        const submitBtn = screen.getByRole("button", { name: /reset password/i });
        fireEvent.submit(submitBtn);

        await waitFor(() => {
            expect(resetSpy).toHaveBeenCalledWith(
                {
                    password: "NewSecurePassword123!",
                    confirm_password: "NewSecurePassword123!",
                },
                resetToken
            );
        });
    });

    it("should display server error message when completeRegister fails", async () => {
        jest.spyOn(authServices, "completeRegister").mockRejectedValueOnce({
            isAxiosError: true,
            response: { data: { message: "Invalid token or expired session", status: "error" } },
        });

        renderWithProviders(<CreatePasswordForm />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmInput = screen.getByLabelText(/^confirm password$/i);

        await user.type(passwordInput, "Password123!");
        await user.type(confirmInput, "Password123!");

        const submitBtn = screen.getByRole("button", { name: /create account/i });
        fireEvent.submit(submitBtn);

        expect(await screen.findByText("Invalid token or expired session")).toBeInTheDocument();
    });
});
