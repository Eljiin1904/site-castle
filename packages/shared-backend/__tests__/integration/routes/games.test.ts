import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { handleFetch } from "../../testUtility";
import config from "#app/config";
import { SiteGameDisplayDocument } from "@core/types/site/SiteGameDisplayDocument";

const BASE_URL = config.siteAPI;

describe("Test Dice Game Route", () => {
  it("Get Original Games", async () => {
    let url = BASE_URL + "/games/get-games";
    const allGames = await Database.collection("site-games")
      .find()
      .sort({ timestamp: -1 })
      .toArray();

    let getGamesResponse = await handleFetch(url, "POST", {
      category: "all",
    });

    const result = await getGamesResponse.json();

    expect(result.games.length).toEqual(allGames.length);
  });

  it("Get Original Games", async () => {
    const allGames = await Database.collection("site-games")
      .find({ category: "original" })
      .sort({ timestamp: -1 })
      .toArray();

    let url = BASE_URL + "/games/get-games";
    let getGamesResponse = await handleFetch(url, "POST", {
      category: "original",
    });

    const result = await getGamesResponse.json();
    const containsCategory = result.games.some(
      (game: SiteGameDisplayDocument) => game.category == "original",
    );
    expect(containsCategory).toBe(true);
    expect(result.games.length).toEqual(allGames.length);
  });

  it("Get Slot Games", async () => {
    const allGames = await Database.collection("site-games")
      .find({ category: "slots" })
      .sort({ timestamp: -1 })
      .toArray();

    let url = BASE_URL + "/games/get-games";
    let getGamesResponse = await handleFetch(url, "POST", {
      category: "slots",
    });

    const result = await getGamesResponse.json();
    const containsCategory = result.games.some(
      (game: SiteGameDisplayDocument) => game.category == "slots",
    );
    expect(containsCategory).toBe(true);
    expect(result.games.length).toEqual(allGames.length);
  });

  it("Get Live Casino Games", async () => {
    const allGames = await Database.collection("site-games")
      .find({ category: "live_casino" })
      .sort({ timestamp: -1 })
      .toArray();
    let url = BASE_URL + "/games/get-games";
    let getGamesResponse = await handleFetch(url, "POST", {
      category: "live_casino",
    });

    const result = await getGamesResponse.json();
    const containsCategory = result.games.some(
      (game: SiteGameDisplayDocument) => game.category == "live_casino",
    );
    expect(containsCategory).toBe(true);
    expect(result.games.length).toEqual(allGames.length);
  });

  it("Get Game Show Games", async () => {
    const allGames = await Database.collection("site-games")
      .find({ category: "live_casino" })
      .sort({ timestamp: -1 })
      .toArray();
    let url = BASE_URL + "/games/get-games";
    let getGamesResponse = await handleFetch(url, "POST", {
      category: "game_shows",
    });

    const result = await getGamesResponse.json();
    const containsCategory = result.games.some(
      (game: SiteGameDisplayDocument) => game.category == "game_shows",
    );
    expect(containsCategory).toBe(true);
    expect(result.games.length).toEqual(allGames.length);
  });

  it("Wrong Game Category", async () => {
    let url = BASE_URL + "/games/get-games";
    let getGamesResponse = await handleFetch(url, "POST", {
      category: "",
    });

    const result = await getGamesResponse.json();

    expect(result["error"]).toBe("Invalid Category");
  });
});
