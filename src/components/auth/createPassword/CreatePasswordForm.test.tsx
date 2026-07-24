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

    it("should display validation error when password is less than 6 characters", async () => {
        renderWithProviders(<CreatePasswordForm />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        await user.type(passwordInput, "123");
        await user.tab();

        expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
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

    it("should call authServices.completeRegister when submitting valid matching passwords", async () => {
        const completeSpy = jest.spyOn(authServices, "completeRegister").mockResolvedValueOnce({
            status: "success",
            data: {
                access_token: "mock-access-token",
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
            expect(localStorage.getItem("focusFlowToken")).toBe("mock-access-token");
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
