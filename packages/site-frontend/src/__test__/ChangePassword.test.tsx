import { ChangePassword } from "#app/comps/profile/password/ChangePassword";
import { render, screen, fireEvent, act } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Profile Change Password Screen", () => {
  it("value input change", async () => {
    // Render the component
    render(<ChangePassword />); // Pass the mock as a prop

    const oldPasswordInput = screen.getByPlaceholderText("Enter Old Password");
    const newPasswordInput = screen.getByPlaceholderText("Enter New Password");

    // Find the Save button
    const saveButton = screen.getByText("Save Changes");
    expect(saveButton).toBeInTheDocument(); // Correct the assertion

    fireEvent.change(oldPasswordInput, { target: { value: "passwordtest" } });
    fireEvent.change(newPasswordInput, { target: { value: "testPassword" } });

    // Assertions for input values
    expect(oldPasswordInput.value).toBe("passwordtest");
    expect(newPasswordInput.value).toBe("testPassword");

    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
});
