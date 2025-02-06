import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { Link } from "@client/comps/link/Link";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { StatusBar } from "../comps/StatusBar";

export const OfferContent = ({ offerId }: { offerId: string }) => {
  return (
    <Div
      fx
      column
      grow
    >
      <StatusBar
        label="3/3: Accept Offer"
        progress={0.666}
      />
      <Div
        column
        center
        p={12}
        gap={4}
        mt={20}
        mb={16}
        bg="gray-8"
        border
        grow
      >
        <Span size={12}>{"Trade Offer Sent!"}</Span>
        <Span
          weight="semi-bold"
          size={16}
          color="light-blue"
        >
          {`${offerId}`}
        </Span>
      </Div>
      <Div
        fx
        column
        gap={12}
      >
        <Link
          fx
          type="a"
          href={`https://steamcommunity.com/tradeoffer/${offerId}`}
        >
          <Button
            fx
            kind="primary"
            label="Confirm in Browser"
            iconRight={SvgExternal}
          />
        </Link>
        <Link
          fx
          type="a"
          href={`steam://openurl/https://steamcommunity.com/tradeoffer/${offerId}`}
        >
          <Button
            fx
            kind="secondary"
            label="Confirm in Client"
            iconRight={SvgExternal}
          />
        </Link>
      </Div>
    </Div>
  );
};
