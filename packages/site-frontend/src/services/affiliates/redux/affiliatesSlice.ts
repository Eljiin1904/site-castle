import { createSlice } from "@reduxjs/toolkit";
import { UserCampaigns } from "@core/types/users/UserCampaigns";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";

interface AffiliateState {

  campaigns: UserCampaigns [];
  referredFriends: number;
  unclaimedCommission: number;
  totalComission: number;
  totalFriendsWagered: number;
  limit: number;
  selectedCampaignId: string | null;
}

const initialState: AffiliateState = {
  campaigns: [],
  referredFriends: 0,
  unclaimedCommission: 0,
  totalComission: 0,
  totalFriendsWagered: 0,
  limit: 10,
  selectedCampaignId: null,
};

export const affiliatesSlice = createSlice({
  name: "affiliates",
  initialState,
  reducers: ({ reducer }) => ({
    setCampaigns: reducer<UserCampaigns[]>((state, { payload }) => {
      state.campaigns = payload;
      state.referredFriends = payload.reduce((acc, campaign) => acc + (campaign.referralCount ?? 0), 0);
      state.unclaimedCommission = payload.reduce((acc, campaign) => acc + (campaign.commissionBalance ?? 0), 0);
      state.totalComission = payload.reduce((acc, campaign) => acc + (campaign.commissionTotal ?? 0), 0);
      state.totalFriendsWagered = payload.reduce((acc, campaign) => acc + (campaign.wagerAmount ?? 0), 0);
    }),
    insertCampaign: reducer<UserCampaigns>((state, { payload }) => {
      const existingCampaign = state.campaigns.find(campaign => campaign.campaignId === payload.campaignId);
      if (!existingCampaign) {
        state.campaigns = [payload, ...state.campaigns];
        state.referredFriends += payload.referralCount ?? 0;
        state.unclaimedCommission += payload.commissionBalance ?? 0; 
        state.totalComission += payload.commissionTotal ?? 0;
        state.totalFriendsWagered += payload.wagerAmount ?? 0;
      }
    }),
    updateCampaign: reducer<StreamUpdate>((state, { payload }) => {
      const existingCampaign = state.campaigns.find(campaign => campaign._id === payload.documentId);
      if (existingCampaign) {
        const updatedCampaign = { ...existingCampaign, ...payload.updatedFields };
        
        state.referredFriends += (updatedCampaign.referralCount ?? 0) - (existingCampaign.referralCount ?? 0);
        state.unclaimedCommission += (updatedCampaign.commissionBalance ?? 0) - (existingCampaign.commissionBalance ?? 0);
        state.totalComission += (updatedCampaign.commissionTotal ?? 0) - (existingCampaign.commissionTotal ?? 0);
        state.totalFriendsWagered += (updatedCampaign.wagerAmount ?? 0) - (existingCampaign.wagerAmount ?? 0);
        
        state.campaigns = state.campaigns.map(campaign =>
          campaign._id === payload.documentId ? updatedCampaign : campaign
        );
      }
    }),
    setSelectedCampaignId: reducer<string | null>((state, { payload }) => {
      state.selectedCampaignId = payload;
    }),
    setLimit: reducer<number>((state, { payload }) => {
      state.limit = payload;
    })
  }),
});

export const {
  setCampaigns,
  insertCampaign,
  updateCampaign,
  setSelectedCampaignId,
  setLimit,
} = affiliatesSlice.actions;
