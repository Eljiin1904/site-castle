import { AdventTicketDocument } from "@core/types/rewards/AdventTicketDocument";
import { Items } from "@core/services/items";
import { Card } from "@client/comps/cards/Card";
import { SvgSnowflake } from "@client/svgs/common/SvgSnowflake";
import { SvgTimesCirlce } from "@client/svgs/common/SvgTimesCircle";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ItemIcon } from "@client/comps/item/ItemIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./DoorCard.scss";

export const DoorCard = ({
  day,
  currentDay,
  ticket,
  onClick,
}: {
  day: number;
  currentDay: number;
  ticket: AdventTicketDocument | undefined;
  onClick: () => void;
}) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const processing = useAppSelector((x) => x.holiday.processing);
  const disabled = !authenticated || processing || ticket || day !== currentDay;
  const canHover = !disabled || ticket;
  const missed = day < currentDay && !ticket;

  return (
    <Card
      className="DoorCard"
      column
      center
      hover={canHover ? "up" : undefined}
      cursor={canHover ? undefined : "not-allowed"}
      onClick={disabled ? undefined : onClick}
    >
      {ticket ? (
        <Div column>
          <ItemIcon
            imageType="png"
            imagePath={`/items/${ticket.item.slug}`}
            size="80px"
            rarity={Items.getRarity(ticket.item.lootValue)}
          />
          <Tokens
            value={ticket.item.lootValue}
            mt={8}
          />
        </Div>
      ) : (
        <Vector
          as={missed ? SvgTimesCirlce : SvgSnowflake}
          size={80}
          style={{ opacity: 0.2 }}
        />
      )}
      <Span
        position="absolute"
        top={4}
        left={8}
        size={13}
        family="title"
        weight="semi-bold"
        color="light-gray"
      >
        {day}
      </Span>
    </Card>
  );
};
