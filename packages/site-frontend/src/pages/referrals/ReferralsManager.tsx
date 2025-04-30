import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Affiliates } from "#app/services/affiliates";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const ReferralsManager = () => {

  const userId = useAppSelector((x) => x.user._id);
  const dispatch = useAppDispatch();

  usePresence({
    joinKey: "campaign-join",
    leaveKey: "campaign-leave",
    roomKey: userId,
  });
  
  useSocketListener("campaign-init", (campaigns) => {
    dispatch(Affiliates.setCampaigns(campaigns));
    dispatch(Affiliates.setSelectedCampaignId(campaigns.find(x => x.default)?.campaignId || null));
  });

  useSocketListener("campaign-insert", (campaign) => {
    dispatch(Affiliates.insertCampaign(campaign));    
  });
  useSocketListener("campaign-update", (document) => {
    dispatch(Affiliates.updateCampaign(document));    
  });

  return null;
};
