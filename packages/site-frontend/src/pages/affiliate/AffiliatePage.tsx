import { SitePage } from "#app/comps/site-page/SitePage";
import { ReferralsBody } from "./referrals/ReferralsBody";
import { Fragment } from "react/jsx-runtime";



import { ImageBanner } from "./ImageBanner";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { AffiliateHowItWorksModal } from "#app/modals/affiliate/AffiliateHowItWorksModal";
import { KeyboardInput } from "@client/comps/input/KeyboardInput";
import config from "#app/config";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { AffiliateReferAFriendModal } from "#app/modals/affiliate/AffiliateReferAFriendModal";
import { HeroBanner } from "#app/app/banner/HeroBanner";

export const AffiliatePage = () => {
  const small = useIsMobileLayout();
  const username = useAppSelector((x) => x.user.username);

  return (<Fragment>
    <HeroBanner/>
    <SitePage
      className="AffiliatePage"
      title="Affiliate"
      privileged
    >
      <ImageBanner image="/graphics/referral-tile">
      <Div
        column
        grow
        gap={16}
      >
        <Heading
          as={"h1"}
          color={"dark-brown"}
          size={small ? 32: 48}
          lineHeight={small ? 32 : 40}
          style={{ maxWidth: small ? "100%" : "550px" }}
          fontWeight="regular"
          textTransform="uppercase"
        >
        Refer a Friend
        </Heading>
        <Span
          color={"dark-brown"}
          style={{ maxWidth: small ? "260px" : "450px" }}
          fontSize={small ? 12 : 16}
          fontWeight="medium"
        >
          Refer a friend and earn  <Span bg="dark-brown" color="light-sand"  fontSize={small ? 12 : 16} p={2} mx={4}> 10% </Span>  commission from the house edge on all of their bets!
        </Span>
        <Span
          color={"dark-brown"}
          style={{ maxWidth: small ? "200px" : "450px" }}
          fontSize={small ? 12 : 16}
          fontWeight="medium"
        >
        Your referral Link:
        </Span>
        <Div width={small ? "full": 512} gap={16} column>
          <KeyboardInput value={`${config.siteURL}/r/${username}`} onClick={() => Dialogs.open("primary", <AffiliateReferAFriendModal />)} />
          <Button 
          kind="secondary-black"
          onClick={() => Dialogs.open("primary", <AffiliateHowItWorksModal/>)}
          >How it Works</Button>
        </Div>
      </Div>
      </ImageBanner>
      <ReferralsBody />
    </SitePage>
    </Fragment>
  );
};
