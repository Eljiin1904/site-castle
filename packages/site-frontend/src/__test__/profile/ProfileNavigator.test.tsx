import { ProfileNavigator } from "#app/comps/profile/ProfileNavigator";
import { render, screen, fireEvent } from "@testing-library/react";

import { describe, expect, vi, it } from "vitest";

describe("Profile Navigator Screen", () => {
  it("test profile information being selected item", async () => {
    const setStateMock = vi.fn(); // Mock the setState function

    render(
      <ProfileNavigator
        selectedItem={"profile_information"}
        setSelectedItem={setStateMock}
      />,
    );

    const profileInformationLabel = screen.getByText("Profile Information");
    expect(profileInformationLabel.className).contains("_color-sand"); // Active Color
    expect(profileInformationLabel).toBeInTheDocument();

    const changePasswordLabel = screen.getByText("Change Password");
    expect(changePasswordLabel.className).contains("_color-brown-10"); // Not Active Color
    expect(changePasswordLabel).toBeInTheDocument();

    const securityTwoFALabel = screen.getByText("Security (2FA)");
    expect(securityTwoFALabel.className).contains("_color-brown-10"); // Not Active Color
    expect(securityTwoFALabel).toBeInTheDocument();

    const verifyLabel = screen.getByText("Verify");
    expect(verifyLabel.className).contains("_color-brown-10"); // Not Active Color
    expect(verifyLabel).toBeInTheDocument();

    const settingLabel = screen.getByText("Settings");
    expect(settingLabel.className).contains("_color-brown-10"); // Not Active Color
    expect(settingLabel).toBeInTheDocument();
  });

  it("test profile information change selected item", async () => {
    const setStateMock = vi.fn(); // Mock the setState function

    render(
      <ProfileNavigator
        selectedItem={"settings"}
        setSelectedItem={setStateMock}
      />,
    );

    const profileInformationLabel = screen.getByText("Profile Information");
    expect(profileInformationLabel.className).contains("_color-brown-10"); // Not Active Color
    expect(profileInformationLabel).toBeInTheDocument();

    const changePasswordLabel = screen.getByText("Change Password");
    expect(changePasswordLabel.className).contains("_color-brown-10"); // Not Active Color
    expect(changePasswordLabel).toBeInTheDocument();

    const securityTwoFALabel = screen.getByText("Security (2FA)");
    expect(securityTwoFALabel.className).contains("_color-brown-10"); // Not Active Color
    expect(securityTwoFALabel).toBeInTheDocument();

    const verifyLabel = screen.getByText("Verify");
    expect(verifyLabel.className).contains("_color-brown-10"); // Not Active Color
    expect(verifyLabel).toBeInTheDocument();

    const settingLabel = screen.getByText("Settings");
    expect(settingLabel.className).contains("_color-sand"); // Active Color
    expect(settingLabel).toBeInTheDocument();

    fireEvent.click(settingLabel);

    // Label Clicked
    expect(setStateMock).toHaveBeenCalledOnce();
  });
});
