import { ProfileContent } from "#app/comps/profile/ProfileContent";
import { store } from "#app/store";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";

describe("Profile Content Screen", () => {
  it("test profile information appearing on screen as selected item", async () => {
    vi.mock("./hooks/useAppSelector", () => ({
      useAppSelector: vi.fn(),
    }));
    render(
      <Provider store={store}>
        <ProfileContent selectedItem={"profile_information"} />
      </Provider>,
    );

    const profileInformationLabel = screen.getByText("Profile Information");
    expect(profileInformationLabel).toBeInTheDocument();

    const username = screen.getByText("Username");
    expect(username).toBeInTheDocument();

    const email = screen.getByText("Email");
    expect(email).toBeInTheDocument();

    const password = screen.getByText("Password");
    expect(password).toBeInTheDocument();
  });
});

describe("Profile Content Screen", () => {
  it("test change password appearing on screen as selected item", async () => {
    vi.mock("./hooks/useAppSelector", () => ({
      useAppSelector: vi.fn(),
    }));
    render(
      <Provider store={store}>
        <ProfileContent selectedItem={"change_password"} />
      </Provider>,
    );

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

  describe("Profile Content Screen", () => {
    it("test security appearing on screen as selected item", async () => {
      vi.mock("./hooks/useAppSelector", () => ({
        useAppSelector: vi.fn(),
      }));
      render(
        <Provider store={store}>
          <ProfileContent selectedItem={"security"} />
        </Provider>,
      );
      const securityLabel = screen.getByText("Security (2FA)");
      expect(securityLabel).toBeInTheDocument();

      const enablePrompt = screen.getByText("Google Autheticator.");
      expect(enablePrompt).toBeInTheDocument();

      const scanPrompt = screen.getByText(
        "Scan QR code with your google Authenticator App or enter the secret key manually.",
      );
      expect(scanPrompt).toBeInTheDocument();

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(1);
      expect(screen.getByRole("button", { name: "Save Backup Key" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Enable 2FA" })).toBeInTheDocument();
    });
  });

  describe("Profile Content Screen", () => {
    it("test verify appearing on screen as selected item", async () => {
      vi.mock("./hooks/useAppSelector", () => ({
        useAppSelector: vi.fn(),
      }));
      render(
        <Provider store={store}>
          <ProfileContent selectedItem={"verify"} />
        </Provider>,
      );
      const verifyLabel = screen.getByText("VERIFY YOUR ACCOUNT");
      expect(verifyLabel).toBeInTheDocument();
    });
  });

  describe("Profile Content Screen", () => {
    it("test setting appearing on screen as selected item", async () => {
      vi.mock("./hooks/useAppSelector", () => ({
        useAppSelector: vi.fn(),
      }));
      render(
        <Provider store={store}>
          <ProfileContent selectedItem={"settings"} />
        </Provider>,
      );
      const settingLabel = screen.getByText("Settings");
      expect(settingLabel).toBeInTheDocument();
      //   // Check for labels
      expect(screen.getByText("Marketing Communication")).toBeInTheDocument();
      expect(screen.getByText("General Notifications")).toBeInTheDocument();
      expect(screen.getByText("Deposit and withdraw notifications")).toBeInTheDocument();
      expect(screen.getByText("Receive SMS notifications")).toBeInTheDocument();
      expect(screen.getByText("Hidden Account")).toBeInTheDocument();
      expect(screen.getByText("Set your own ban")).toBeInTheDocument();
      expect(screen.getByText("Delete your account")).toBeInTheDocument();

      // Check for messages
      expect(
        screen.getByText("Receive marketing email notifications to your email"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Receive general email notifications to your email"),
      ).toBeInTheDocument();
      expect(screen.getByText("Receive deposit and withdraw notifications")).toBeInTheDocument();
      expect(
        screen.getByText("Receive your SMS notifications to mobile phone"),
      ).toBeInTheDocument();
      expect(screen.getByText("Hide information related to User")).toBeInTheDocument();
      expect(screen.getByText("Set your own ban for a period of time")).toBeInTheDocument();
      expect(screen.getByText("Delete your account with all the data.")).toBeInTheDocument();

      // Check if the button is rendered for "Notifications"
      expect(screen.getByRole("button", { name: "Set Ban" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Delete Account" })).toBeInTheDocument();

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });
  });
});
