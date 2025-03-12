import { describe, it, expect } from "vitest";
import config from "#app/config";

describe("registration testing with email (local)", () => {
  const url = config.siteAPI + "/register/local";
  const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance

  it("should successfully register a new user", async () => {
    const email = "integration1@pidwin.com";
    const postData = {
      username: "inttest1",
      email,
      password: "P@ssw0rd",
      captchaToken: hCaptchaToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    expect(response.status).toBe(200);

    const responseData = await response.json();

    expect(responseData).toHaveProperty("user._id");
    expect(responseData.user.email).toBe(email);
  });

  it("should fail with too short of a username", async () => {
    const postData = {
      username: "2", // above the 15 character limit
      email: "integration2@pidwin.com",
      password: "P@ssw0rd",
      captchaToken: hCaptchaToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    expect(response.status).toBe(500);
  });

  it("should fail with too long of a username", async () => {
    const postData = {
      username: "integration_test3", // above the 15 character limit
      email: "integration3@pidwin.com",
      password: "P@ssw0rd",
      captchaToken: hCaptchaToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    expect(response.status).toBe(500);
  });

  it("should fail with an underscore in username", async () => {
    const postData = {
      username: "int_test4", // above the 15 character limit
      email: "integration4@pidwin.com",
      password: "P@ssw0rd",
      captchaToken: hCaptchaToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    expect(response.status).toBe(500);
  });

  it("should fail with an already existing email", async () => {
    const postData = {
      username: "inttest5", // above the 15 character limit
      email: "integration5@pidwin.com",
      password: "P@ssw0rd",
      captchaToken: hCaptchaToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    expect(response.status).toBe(200);

    // perform post again
    const response2 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    expect(response2.status).toBe(400);
  });

  it("should fail with an already existing username", async () => {
    const postData = {
      username: "inttest6", // above the 15 character limit
      email: "integration6@pidwin.com",
      password: "P@ssw0rd",
      captchaToken: hCaptchaToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    expect(response.status).toBe(200);

    // perform post again, but change email
    postData.email = "allgood@pidwin.com";
    const response2 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    expect(response2.status).toBe(400);
  });
});
