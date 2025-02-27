import { ProfileSecurity } from "#app/comps/profile/ProfileSecurity";
import { Button } from "@client/comps/button/Button";

import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as reactRedux from "react-redux";
import { ProfileSettings } from "#app/comps/profile/ProfileSettings";

// Mock the useSelector hook
// vi.spyOn(reactRedux, "useSelector").mockImplementation((selector) =>
//   selector({ someValue: "Mocked Value" }),
// );

// Mock the react-redux module
// vi.mock("react-redux", () => ({
//   useSelector: vi.fn(),
//   useDispatch: vi.fn(),
// }));

describe("Profile Setting Screen", () => {
  test("renders heading", async () => {
    // const mockUseSelector = require("react-redux").useSelector;
    // mockUseSelector.mockReturnValue("Mocked Value");
    render(<ProfileSettings />);
    // Check for labels
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
    expect(screen.getByText("Receive your SMS notifications to mobile phone")).toBeInTheDocument();
    expect(screen.getByText("Hide information related to User")).toBeInTheDocument();
    expect(screen.getByText("Set your own ban for a period of time")).toBeInTheDocument();
    expect(screen.getByText("Delete your account with all the data.")).toBeInTheDocument();

    // Check if the button is rendered for "Notifications"
    expect(screen.getByRole("button", { name: "Set Ban" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete Account" })).toBeInTheDocument();
  });

  it("Check amount of Valid buttons", () => {
    render(<ProfileSettings />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
});
