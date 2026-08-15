import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import {
  renderWithProviders,
  screen,
  waitFor,
  fireEvent,
} from "@/utils/test-utils";
import { authServices } from "@/api/services/authServices";
import ForgotPasswordForm from "./ForgotPasswordForm";

describe("ForgotPasswordForm Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("should render essential form controls and buttons", () => {
    renderWithProviders(<ForgotPasswordForm />);

    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i }),
    ).toBeInTheDocument();
  });

  it("should display error on invalid email blur", async () => {
    renderWithProviders(<ForgotPasswordForm />);

    const emailInput = screen.getByLabelText(/^email$/i);
    await user.type(emailInput, "invalid-email");
    await user.tab();

    expect(
      await screen.findByText("Invalid email address"),
    ).toBeInTheDocument();
  });

  it("should call authServices.forgotPassword when submitting valid email", async () => {
    const forgotSpy = vi
      .spyOn(authServices, "forgotPassword")
      .mockResolvedValueOnce({
        status: "success",
        message: "Password reset OTP sent to email",
      });

    renderWithProviders(<ForgotPasswordForm />);

    const emailInput = screen.getByLabelText(/^email$/i);
    await user.type(emailInput, "user@example.com");

    const submitBtn = screen.getByRole("button", { name: /continue/i });
    fireEvent.submit(submitBtn);

    await waitFor(() => {
      expect(forgotSpy).toHaveBeenCalledWith({
        email: "user@example.com",
      });
      expect(localStorage.getItem("otp_resend_user@example.com")).toBeTruthy();
    });
  });

  it("should display server error message when forgotPassword API fails", async () => {
    vi.spyOn(authServices, "forgotPassword").mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: "Email not found", status: "error" } },
    });

    renderWithProviders(<ForgotPasswordForm />);

    const emailInput = screen.getByLabelText(/^email$/i);
    await user.type(emailInput, "nonexistent@example.com");

    const submitBtn = screen.getByRole("button", { name: /continue/i });
    fireEvent.submit(submitBtn);

    expect(await screen.findByText("Email not found")).toBeInTheDocument();
  });
});
