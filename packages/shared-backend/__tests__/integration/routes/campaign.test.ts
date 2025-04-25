import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import bcrypt from "bcrypt";
import config from "#app/config";
import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";
import { afterCampaignTransaction, afterTransaction } from "@server/services/affiliates/Affiliates";
import { Affiliates } from "@server/services/affiliates";
import { subDays } from "date-fns";

const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance

describe("Test Campaign Routes", () => {
  beforeAll(async () => {
    const passwordHash = await bcrypt.hash("password123", 8);
    const user = createTestUser("campaignTest", "campaignTest@gmail.com", "user", passwordHash);

    await Database.collection("site-settings").insertOne({
      _id: "affiliatesEnabled",
      value: true,
      lastUpdateDate: new Date(),
    });

    await Database.collection("site-settings").insertOne({
      _id: "doubleEnabled",
      value: true,
      lastUpdateDate: new Date(),
    });
    await Database.collection("site-settings").insertOne({
      _id: "doubleXpRate",
      value: 1,
      lastUpdateDate: new Date(),
    });
    await Database.collection("users").insertOne(user);
  });

  it("Create Campaign", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/affiliates/create-campaign";
    let getCreateCampaignResponse = await fetchWithCookie(
      url,
      "POST",
      {
        campaignId: "campaign_test",
        campaignName: "Campaign Youtube",
      },
      sessionCookie,
    );

    url = BASE_URL + "/affiliates/get-campaigns";
    let getCampaignsResponse = await fetchWithCookie(
      url,
      "POST",
      {
        limit: 10,
        page: 1,
      },
      sessionCookie,
    );
    const getCampaignResult = await getCampaignsResponse.json();
    const campaign = getCampaignResult.campaigns[0];

    expect(getCreateCampaignResponse.status).toBe(200);
    expect(campaign.userId).toBe(user._id);
    expect(campaign.campaignId).toBe("campaign_test");
    expect(campaign.campaignName).toBe("Campaign Youtube");
    expect(campaign.commissionRate).toBe(0.1);
    expect(campaign.commissionTotal).toBe(0);
    expect(campaign.totalDeposit).toBe(0);
    expect(campaign.campaignHits).toBe(0);
    expect(campaign.commissionBalance).toBe(0);
    expect(campaign.referralCount).toBe(0);
    expect(campaign.campaignTier).toBe(1);
  });

  it("Fail Debit Campaign Commission: Balance too low", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );
    let url = BASE_URL + "/affiliates/claim-campaign-commission";
    let getDebitCampaignResponse = await fetchWithCookie(
      url,
      "POST",
      {
        campaignId: "campaign_test",
      },
      sessionCookie,
    );
    const getDebitCommissionResult = await getDebitCampaignResponse.json();
    expect(getDebitCommissionResult["error"]).toBe("Your balance is too low.");
  });

  it("Utilize Campaign", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/affiliates/create-campaign";
    let getCreateCampaignResponse = await fetchWithCookie(
      url,
      "POST",
      {
        campaignId: "campaign_test2",
        campaignName: "Campaign Youtube",
      },
      sessionCookie,
    );

    url = BASE_URL + "/affiliates/get-campaigns";
    let getCampaignsResponse = await fetchWithCookie(
      url,
      "POST",
      {
        limit: 10,
        page: 1,
      },
      sessionCookie,
    );
    const getCampaignResult = await getCampaignsResponse.json();
    const campaign = getCampaignResult.campaigns[0];

    const registerUrl = config.siteAPI + "/register/local";
    const postData = {
      username: "utilizeCTest",
      email: "utilizeCTest@gmail.com",
      emailConfirmed: true,
      password: "password123",
      captchaToken: hCaptchaToken,
      referralCode: campaign.campaignId,
    };

    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    await Database.collection("users").updateOne(
      { username: "utilizeCTest" },
      { $set: { emailConfirmed: true } },
    );

    const utilizedUser = await Database.collection("users").findOne({ username: "utilizeCTest" });
    if (!utilizedUser) return;
    const [utilizedSessionResponse, utilizedSessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: utilizedUser.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    const defaultCampaign = await Database.collection("user-campaigns").findOne({
      campaignId: utilizedUser.username,
    });

    if (!defaultCampaign) return;
    expect(defaultCampaign.campaignId).toBe(utilizedUser.username);
    expect(defaultCampaign.campaignName).toBe("Refer A Friend");

    const affliateReferrals = await Database.collection("affiliate-referrals").findOne({
      affiliateId: campaign._id,
    });

    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    const serverSeed = Ids.secret();
    const serverSeedHash = Random.hashServerSeed(serverSeed);

    const round: DoubleRoundDocument = {
      _id: roundId,
      timestamp: new Date(),
      serverSeed,
      serverSeedHash,
      status: "waiting",
      statusDate: new Date(),
    };

    await Database.collection("double-rounds").insertOne(round);

    url = BASE_URL + "/double/post-ticket";
    let createDoubleTicket = await fetchWithCookie(
      url,
      "POST",
      {
        roundId,
        betKind: "green",
        betAmount: 1000000000,
      },
      utilizedSessionCookie,
    );
    const getDoubleResult = await createDoubleTicket.json();

    const doubleTransaction = await Database.collection("transactions").findOne({
      roundId: getDoubleResult.roundId,
    });

    if (doubleTransaction) {
      afterCampaignTransaction(doubleTransaction);
    }

    await new Promise((resolve) => setTimeout(resolve, 250));

    const updatedCampaign: any = await Database.collection("user-campaigns").findOne({
      campaignId: "campaign_test2",
    });

    expect(updatedCampaign.campaignId).toBe("campaign_test2");
    expect(updatedCampaign.campaignName).toBe("Campaign Youtube");
    expect(updatedCampaign.commissionRate).toBe(0.1);
    expect(updatedCampaign.commissionTotal).toBe(3333500);
    expect(updatedCampaign.referralXp).toBe(1000000000);
    expect(updatedCampaign.referralCount).toBe(1);

    const affiliateReport: any = await Database.collection("affiliate-reports").findOne({
      affiliateId: updatedCampaign._id,
    });

    expect(affiliateReport.affiliateId).toBe(updatedCampaign._id);
    expect(affiliateReport.commissionAmount).toBe(3333500);
    expect(affiliateReport.wagerAmount).toBe(1000000000);
    expect(affiliateReport.xp).toBe(1000000000);
  });

  it("Retreive Campaign Available Balance", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    const debitTransaction = await Database.collection("transactions").findOne({
      campaignId: "campaign_test2",
      kind: "affiliate-campaign-commission-claim",
    });

    if (!debitTransaction) return;
    expect(debitTransaction.kind).toBe("affiliate-campaign-commission-claim");
    expect(debitTransaction.value).toBe(3333500);

    const updateBalance = await Database.collection("users").findOne({ username: "campaignTest" });
    expect(updateBalance?.tokenBalance).toBe(3343500);
  });

  it("Affiliate Get Aggregated Stats", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;

    const minDate = subDays(Date.now(), 1);
    const maxDate = new Date();
    const campaign: any = await Database.collection("user-campaigns").findOne({
      campaignId: "campaign_test2",
    });

    const stats = await Affiliates.aggregateCampaignStats({
      affiliateId: campaign._id,
      minDate,
      maxDate,
    });

    expect(stats.rewardAmount).toBe(0);
    expect(stats.activeCount).toBe(1);
    expect(stats.depositAmount).toBe(0);
    expect(stats.depositorCount).toBe(0);
    expect(stats.commissionAmount).toBe(3333500);
    expect(stats.wagerAmount).toBe(1000000000);
    expect(stats.referralXp).toBe(1000000000);
    expect(stats.referralCount).toBe(1);
  });

  it("Affiliate Get Aggregated Reports", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;

    const minDate = subDays(Date.now(), 1);
    const maxDate = new Date();
    const campaign: any = await Database.collection("user-campaigns").findOne({
      campaignId: "campaign_test2",
    });

    const reports = await Affiliates.aggregateCampaignReports({
      userId: user._id,
      affiliateId: campaign._id,
      minDate,
      maxDate,
      sort: {
        ...[
          { depositAmount: -1 },
          { wagerAmount: -1 },
          { commissionAmount: -1 },
          { lastDepositDate: -1 },
          { referDate: -1 },
        ][4],
        _id: 1,
      },
      limit: 10,
      page: 1,
    });
    const report = reports[0];
    console.log("Reports");
    console.log(report);

    expect(report.depositAmount).toBe(0);
    expect(report.commissionAmount).toBe(3333500);
    expect(report.wagerAmount).toBe(1000000000);
    expect(report.user.name).toBe("utilizeCTest");
    expect(report.user.role).toBe("user");
  });

  it("Fail Create Campaign (campaignId)", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/affiliates/create-campaign";
    let getCreateCampaignResponse = await fetchWithCookie(
      url,
      "POST",
      {
        campaignId: "c",
        campaignName: "Campaign Youtube",
      },
      sessionCookie,
    );

    const getCreateResult = await getCreateCampaignResponse.json();

    expect(getCreateCampaignResponse.status).toBe(500);
    expect(getCreateResult["error"]["key"]).toBe("validations.string.min");
    expect(getCreateResult["error"]["value"]["label"]).toBe("campaignId");
    expect(getCreateResult["error"]["value"]["min"]).toBe(5);
  });

  it("Fail Create Campaign Max Length (campaignId)", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/affiliates/create-campaign";
    let getCreateCampaignResponse = await fetchWithCookie(
      url,
      "POST",
      {
        campaignId:
          "rmflkrmfkmrmf mflemlfmelmfl meflfmlemflmelf emflmlemlfmel fee;lmekemflkefemk femfkmekfe",
        campaignName: "Campaign Youtube",
      },
      sessionCookie,
    );

    const getCreateResult = await getCreateCampaignResponse.json();

    expect(getCreateCampaignResponse.status).toBe(500);
    expect(getCreateResult["error"]["key"]).toBe("validations.string.max");
    expect(getCreateResult["error"]["value"]["label"]).toBe("campaignId");
    expect(getCreateResult["error"]["value"]["max"]).toBe(25);
  });

  it("Fail Create Campaign (campaignName)", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/affiliates/create-campaign";
    let getCreateCampaignResponse = await fetchWithCookie(
      url,
      "POST",
      {
        campaignId: "campaign_test",
        campaignName: "C",
      },
      sessionCookie,
    );

    const getCreateResult = await getCreateCampaignResponse.json();

    expect(getCreateCampaignResponse.status).toBe(500);
    expect(getCreateResult["error"]["key"]).toBe("validations.string.min");
    expect(getCreateResult["error"]["value"]["label"]).toBe("campaignName");
    expect(getCreateResult["error"]["value"]["min"]).toBe(5);
  });

  it("Fail Create Campaign Max Length (campaignId)", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/affiliates/create-campaign";
    let getCreateCampaignResponse = await fetchWithCookie(
      url,
      "POST",
      {
        campaignId:
          "rmflkrmfkmrmf mflemlfmelmfl meflfmlemflmelf emflmlemlfmel fee;lmekemflkefemk femfkmekfe",
        campaignName: "Campaign Youtube",
      },
      sessionCookie,
    );

    const getCreateResult = await getCreateCampaignResponse.json();

    expect(getCreateCampaignResponse.status).toBe(500);
    expect(getCreateResult["error"]["key"]).toBe("validations.string.max");
    expect(getCreateResult["error"]["value"]["label"]).toBe("campaignId");
    expect(getCreateResult["error"]["value"]["max"]).toBe(25);
  });

  it("Fail Create Campaign Max Length (campaignName)", async () => {
    const user = await Database.collection("users").findOne({ username: "campaignTest" });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/affiliates/create-campaign";
    let getCreateCampaignResponse = await fetchWithCookie(
      url,
      "POST",
      {
        campaignId: "campaign_test",
        campaignName:
          "Cgnrgnrjgnkrngknrkgnkrngknrkgnrkngkrnkgn rkgnkrngkrngknrkngrkngknkgt krgnkrngkrngknrkngmkmkmkmk mkdwmkwnkdnwkndkwd dmwk",
      },
      sessionCookie,
    );

    const getCreateResult = await getCreateCampaignResponse.json();

    expect(getCreateCampaignResponse.status).toBe(500);
    expect(getCreateResult["error"]["key"]).toBe("validations.string.max");
    expect(getCreateResult["error"]["value"]["label"]).toBe("campaignName");
    expect(getCreateResult["error"]["value"]["max"]).toBe(64);
  });
});
