import { ChangePassword } from "#app/comps/profile/password/ChangePassword";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import * as Users from "#app/services/users/Users";
import { CaptchaFormProps } from "#app/comps/captcha-form/CaptchaForm";

vi.mock("#app/services/users/Users", () => ({
  editPassword: vi.fn(),
}));

vi.mock("@client/services/toasts", () => ({
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
}));

vi.mock("#app/comps/captcha-form/useCaptchaForm", () => ({
  useCaptchaForm: vi.fn(),
}));

// Mock CaptchaForm component
vi.mock("#app/comps/captcha-form/CaptchaForm", () => ({
  CaptchaForm: ({ children }: { children: React.ReactElement }) => <div>{children}</div>, // Just render children for simplicity in tests
}));

describe("Profile Change Password Screen", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should not show validation error", async () => {
    const mockForm = {
      values: {
        currentPassword: "oldPassword123",
        newPassword: "newPassword456",
      },
      setValue: vi.fn(),
      loading: false,
      errors: {
        currentPassword: "",
        newPassword: "",
      },
      setError: vi.fn(),
      handleSubmit: vi.fn((callback) => {
        callback(mockForm.values);
      }),
      setSubmitError: vi.fn(),
      challenging: false,
      handleVerify: vi.fn(),
    };

    useCaptchaForm.mockReturnValue({ onSubmit: vi.fn(), ...mockForm });

    render(<ChangePassword />);

    // Simulate filling the form
    fireEvent.change(screen.getByPlaceholderText("Enter Old Password"), {
      target: { value: "oldPassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter New Password"), {
      target: { value: "newPassword456" },
    });

    // Simulate clicking the submit button
    fireEvent.click(screen.getByText("Save Changes"));

    expect(screen.queryByText("Current password is required")).toBeNull();
    expect(screen.queryByText("New password is required")).toBeNull();
  });

  it("should show error if form validation fails", async () => {
    const mockForm = {
      values: {
        currentPassword: "",
        newPassword: "",
      },
      setValue: vi.fn(),
      loading: false,
      errors: {
        currentPassword: "Current password is required",
        newPassword: "New password is required",
      },
      setError: vi.fn(),
      handleSubmit: vi.fn(),
      setSubmitError: vi.fn(),
      challenging: false,
      handleVerify: vi.fn(),
    };

    useCaptchaForm.mockReturnValue(mockForm);

    render(<ChangePassword />);

    // Check for validation error messages
    expect(screen.getByText("Current password is required")).toBeInTheDocument();
    expect(screen.getByText("New password is required")).toBeInTheDocument();
  });
});
