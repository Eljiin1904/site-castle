import { useState } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import config from "#app/config";

export const DashboardBanner = () => {
  const [copied, setCopied] = useState(false);
  const username = useAppSelector((x) => x.user.username);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <PageBanner
      image="/graphics/affiliate-banner"
      heading="Invite and Earn!"
      description="Use your referral link below to invite your friends and earn tokens when they play!"
      content={
        <Div align="center">
          <Div
            fx={small}
            px={12}
            gap={4}
            align="center"
            bg="brown-8"
            border
            borderColor="yellow"
            height={40}
          >
            <Span
              size={small ? 12 : 14}
              color="white"
            >
              {`${config.siteURL}/r/${username}`}
            </Span>
          </Div>
          <Button
            kind="primary"
            label={copied ? "Copied!" : small ? undefined : "Copy Link"}
            icon={small ? SvgCopy : undefined}
            width={small ? undefined : 128}
            onClick={() => {
              navigator.clipboard.writeText(`${config.siteURL}/r/${username}`);
              setCopied(true);
            }}
          />
        </Div>
      }
    />
  );
};
