import userEvent from "@testing-library/user-event";
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

import { renderWithProviders, screen, waitFor } from "@/utils/test-utils";
import { authServices } from "@/api/services/authServices";
import LoginForm from "./LoginForm";

describe("LoginForm Component", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
        jest.spyOn(window, "alert").mockImplementation(() => undefined);
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should render essential form controls and navigation links", () => {
        renderWithProviders(<LoginForm />);

        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /continue with github/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /forgot password\?/i })).toHaveAttribute("href", "/forgot-password");
    });

    it("should toggle password visibility when clicking toggle button", async () => {
        renderWithProviders(<LoginForm />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        const toggleButton = screen.getByRole("button", { name: /show password/i });

        expect(passwordInput).toHaveAttribute("type", "password");

        await user.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "text");
        expect(screen.getByRole("button", { name: /hide password/i })).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /hide password/i }));
        expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("should display error on invalid email blur and clear error when fixed", async () => {
        renderWithProviders(<LoginForm />);

        const emailInput = screen.getByLabelText(/^email$/i);

        await user.type(emailInput, "invalid-email");
        await user.tab();

        expect(await screen.findByText("Invalid email address")).toBeInTheDocument();

        await user.clear(emailInput);
        await user.type(emailInput, "test@example.com");
        await user.tab();

        await waitFor(() => {
            expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
        });
    });

    it("should call authService.login when submitting valid credentials", async () => {
        jest.spyOn(authServices, "login").mockResolvedValueOnce({
            status: "success",
            data: {
                user: {
                    id: "6a574acdd4dc04b4afa1e9fa",
                    email: "user@example.com",
                    full_name: "Developer Test",
                },
            },
        });

        const { store } = renderWithProviders(<LoginForm />);

        await user.type(screen.getByLabelText(/^email$/i), "user@example.com");
        await user.type(screen.getByLabelText(/^password$/i), "password123");
        await user.click(screen.getByRole("button", { name: /log in/i }));

        await waitFor(() => {
            expect(authServices.login).toHaveBeenCalledWith({
                email: "user@example.com",
                password: "password123",
            });
            // Kiểm tra Redux state đã được dispatch thành công trong store riêng
            expect(store.getState().profile.user).toEqual({
                id: "6a574acdd4dc04b4afa1e9fa",
                email: "user@example.com",
                full_name: "Developer Test",
            });
        });
    });

    it("should maintain isolated store state in subsequent tests", () => {
        // Đảm bảo Redux state của test case trước đó KHÔNG bị lây nhiễm sang test case này
        const { store } = renderWithProviders(<LoginForm />);
        expect(store.getState().profile.user).toBeNull();
    });
});