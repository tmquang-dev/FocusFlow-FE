import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

jest.unstable_mockModule("@/api/services/authServices", () => ({
    authServices: {
        login: jest.fn((payload: any) => Promise.resolve({
            status: "success",
            data: {
                access_token: "mock-token",
                user: {
                    id: "6a574acdd4dc04b4afa1e9fa",
                    email: payload.email,
                    full_name: "Developer Test"
                }
            }
        })),
        logout: jest.fn(() => Promise.resolve()),
    }
}));

const { default: LoginForm } = await import("./LoginForm");


// Mocking window.alert
const originalAlert = window.alert;
beforeEach(() => {
    window.alert = jest.fn();
    jest.spyOn(console, "log").mockImplementation(() => { });
});

afterEach(() => {
    window.alert = originalAlert;
    jest.restoreAllMocks();
});

describe("LoginForm Component", () => {
    it("should render all form controls and links correctly", () => {
        render(<LoginForm />);

        // Form inputs
        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();

        // Placeholders
        expect(screen.getByPlaceholderText("name@example.com")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();

        // Buttons
        expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /continue with github/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();

        // Links
        expect(screen.getByRole("link", { name: /forgot password\?/i })).toHaveAttribute("href", "#forgot-password");
        expect(screen.getByRole("link", { name: /create an account/i })).toHaveAttribute("href", "#create-account");
    });

    it("should toggle password visibility when clicking the eye button", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement;
        const toggleButton = screen.getByRole("button", { name: /show password/i });

        // Initial state: hidden
        expect(passwordInput.type).toBe("password");

        // Click to show
        await user.click(toggleButton);
        expect(passwordInput.type).toBe("text");
        expect(screen.getByRole("button", { name: /hide password/i })).toBeInTheDocument();

        // Click again to hide
        await user.click(screen.getByRole("button", { name: /hide password/i }));
        expect(passwordInput.type).toBe("password");
        expect(screen.getByRole("button", { name: /show password/i })).toBeInTheDocument();
    });

    it("should validate email format on blur", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/^email$/i);

        // Input invalid email and trigger blur by clicking password input
        await user.click(emailInput);
        await user.type(emailInput, "invalidemail");
        await user.tab();

        // Error message should appear
        expect(await screen.findByText("Invalid email address")).toBeInTheDocument();

        // Input valid email and trigger blur
        await user.click(emailInput);
        await user.clear(emailInput);
        await user.type(emailInput, "test@example.com");
        await user.tab();
        // Error message should disappear

        await waitFor(() => {
            expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
        });
    });

    it("should validate password length on blur", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const passwordInput = screen.getByLabelText(/^password$/i);

        // Input too short password and trigger blur
        await user.type(passwordInput, "12345");
        await user.click(screen.getByLabelText(/^email$/i));

        expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();

        // Input valid password and trigger blur
        await user.clear(passwordInput);
        await user.type(passwordInput, "123456");
        await user.click(screen.getByLabelText(/^email$/i));

        await waitFor(() => {
            expect(screen.queryByText("Password must be at least 6 characters")).not.toBeInTheDocument();
        });
    });

    it("should submit the form with credentials if valid", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        await user.type(screen.getByLabelText(/^email$/i), "user@example.com");
        await user.type(screen.getByLabelText(/^password$/i), "password123");

        await user.click(screen.getByRole("button", { name: /log in/i }));

        await waitFor(() => {
            expect(localStorage.getItem("token")).toBe("mock-token");
        });
    });

    it("should display alert on social login clicks", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        await user.click(screen.getByRole("button", { name: /continue with github/i }));
        expect(window.alert).toHaveBeenCalledWith("Continue with GitHub selected");

        await user.click(screen.getByRole("button", { name: /continue with google/i }));
        expect(window.alert).toHaveBeenCalledWith("Continue with Google selected");
    });
});
