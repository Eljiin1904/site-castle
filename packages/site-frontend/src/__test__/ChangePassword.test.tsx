import { ChangePassword } from "#app/comps/profile/password/ChangePassword";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Profile Change Password Screen", () => {
  it("value input change", async () => {
    render(<ChangePassword />);

    const oldPasswordInput = screen.getByPlaceholderText("Enter Old Password");
    const newPasswordInput = screen.getByPlaceholderText("Enter New Password");

    const saveButton = screen.getByText("Save Changes");
    expect(saveButton).toBeInTheDocument();

    fireEvent.change(oldPasswordInput, { target: { value: "passwordtest" } });
    fireEvent.change(newPasswordInput, { target: { value: "testPassword" } });

    expect(oldPasswordInput.value).toBe("passwordtest");
    expect(newPasswordInput.value).toBe("testPassword");

    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
});
