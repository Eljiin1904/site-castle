import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProfileSettings } from "#app/comps/profile/settings/ProfileSettings";
import { Provider } from "react-redux";
import { store } from "#app/store";

describe("Profile Setting Screen", () => {
  it("renders toggles and buttons", async () => {
    vi.mock("./hooks/useAppSelector", () => ({
      useAppSelector: vi.fn(), // Mock the hook itself
    }));
    render(
      <Provider store={store}>
        <ProfileSettings />
      </Provider>,
    );

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

    expect(screen.getByRole("button", { name: "Set Ban" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete Account" })).toBeInTheDocument();
  });
});
