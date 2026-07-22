import userEvent from "@testing-library/user-event";
import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

// Import thêm fireEvent từ @/utils/test-utils (hoặc @testing-library/react)
import { renderWithProviders, screen, waitFor, fireEvent } from "@/utils/test-utils";
import { authServices } from "@/api/services/authServices";
import type { IApiRegisterSuccess } from "@/api/services/authServices.type";
import RegisterForm from "./RegisterForm";

describe("RegisterForm Component", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // ==========================================
    // 1. UI RENDERING & HAPPY PATHS
    // ==========================================
    it("should render essential form controls and navigation links", () => {
        renderWithProviders(<RegisterForm />);

        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute("href", "/login");
    });

    it("should call authServices.register when submitting valid email", async () => {
        const registerSpy = jest.spyOn(authServices, "register").mockResolvedValueOnce({
            status: "success",
            message: "OTP sent to email",
        });

        renderWithProviders(<RegisterForm />);

        const emailInput = screen.getByLabelText(/^email$/i);
        await user.type(emailInput, "newuser@example.com");

        // Dùng fireEvent.submit để kích hoạt submit form chuẩn trên JSDOM
        const submitBtn = screen.getByRole("button", { name: /register/i });
        fireEvent.submit(submitBtn);

        await waitFor(() => {
            expect(registerSpy).toHaveBeenCalledWith({
                email: "newuser@example.com",
            });
        });
    });

    // ==========================================
    // 2. FORM VALIDATION CASES
    // ==========================================
    it("should display error on invalid email blur and clear error when fixed", async () => {
        renderWithProviders(<RegisterForm />);

        const emailInput = screen.getByLabelText(/^email$/i);

        // Input invalid -> Blur bằng Tab
        await user.type(emailInput, "invalid-email");
        await user.tab();

        expect(await screen.findByText("Invalid email address")).toBeInTheDocument();

        // Fix invalid -> Valid
        await user.clear(emailInput);
        await user.type(emailInput, "valid@example.com");
        await user.tab();

        await waitFor(() => {
            expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
        });
    });

    it("should display required validation error when submitting empty form", async () => {
        const registerSpy = jest.spyOn(authServices, "register");
        renderWithProviders(<RegisterForm />);

        const submitBtn = screen.getByRole("button", { name: /register/i });
        fireEvent.submit(submitBtn);

        // Kiểm tra thông báo lỗi (Khớp với văn bản validation trong Zod/Yup/Hook Form của bạn)
        expect(await screen.findByText(/invalid email address|email is required/i)).toBeInTheDocument();
        expect(registerSpy).not.toHaveBeenCalled();
    });

    // ==========================================
    // 3. UNHAPPY PATHS & API ERROR HANDLING
    // ==========================================
    it("should display server error message when registration fails", async () => {
        jest.spyOn(authServices, "register").mockRejectedValueOnce({
            isAxiosError: true,
            response: { data: { message: "Email already registered" } },
        });

        renderWithProviders(<RegisterForm />);

        await user.type(screen.getByLabelText(/^email$/i), "existing@example.com");

        const submitBtn = screen.getByRole("button", { name: /register/i });
        fireEvent.submit(submitBtn);

        expect(await screen.findByText("Email already registered")).toBeInTheDocument();
    });

    // ==========================================
    // 4. UX & LOADING STATE (DOUBLE SUBMIT PREVENTION)
    // ==========================================
    it("should disable submit button while request is pending", async () => {
        let resolvePromise: ((value: IApiRegisterSuccess) => void) | undefined;
        const pendingPromise = new Promise<IApiRegisterSuccess>((resolve) => {
            resolvePromise = resolve;
        });

        jest.spyOn(authServices, "register").mockReturnValueOnce(pendingPromise);

        renderWithProviders(<RegisterForm />);

        await user.type(screen.getByLabelText(/^email$/i), "user@example.com");
        const submitBtn = screen.getByRole("button", { name: /register/i });

        fireEvent.submit(submitBtn);

        await waitFor(() => {
            expect(submitBtn).toBeDisabled();
        });

        if (resolvePromise) {
            resolvePromise({ status: "success", message: "Done" });
        }
    });
});