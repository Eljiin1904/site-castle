import { Fragment } from "react";
import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteToken } from "@client/svgs/site/SvgSiteToken";
import { Link } from "@client/comps/link/Link";
import { Dialogs } from "@client/services/dialogs";
import { ChatRainPayoutModal } from "#app/modals/chat/ChatRainPayoutModal";

export const RainPayoutContent = ({
  rainId,
  topPlayers,
  playerCount,
  totalAmount,
}: {
  rainId: string;
  topPlayers: string[];
  playerCount: number;
  totalAmount: number;
}) => {
  return (
    <Link
      type="action"
      hover="none"
      display="block"
      fontSize={13}
      onClick={() =>
        Dialogs.open("primary", <ChatRainPayoutModal rainId={rainId} />)
      }
    >
      {topPlayers.map((player, i) => (
        <Fragment key={i}>
          <Span
            size={13}
            color="white"
          >
            {player}
          </Span>
          {i + 1 < topPlayers.length && <Span size={13}>{", "}</Span>}
        </Fragment>
      ))}
      {playerCount > topPlayers.length && (
        <Fragment>
          <Span size={13}>{" and "}</Span>
          <Span
            size={13}
            color="white"
          >
            {`${playerCount - topPlayers.length} others`}
          </Span>
        </Fragment>
      )}
      <Span size={13}>{" received "}</Span>
      <Div display="inline-block">
        <Vector
          size={13}
          as={SvgSiteToken}
          top={1}
          mr={2}
        />
        <Span
          size={13}
          weight="semi-bold"
          color="light-green"
        >
          {Intimal.toLocaleString(totalAmount)}
        </Span>
      </Div>
      <Span size={13}>{" from the rain!"}</Span>
    </Link>
  );
};
