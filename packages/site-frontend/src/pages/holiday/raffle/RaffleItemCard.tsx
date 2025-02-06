import classNames from "classnames";
import { RaffleState } from "@core/types/rewards/RaffleState";
import { ItemCard } from "@client/comps/item/ItemCard";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { UserBadge } from "@client/comps/user/UserBadge";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./RaffleItemCard.scss";

export const RaffleItemCard = ({
  index,
  raffle,
}: {
  index: number;
  raffle: RaffleState;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  const { items, winners, round } = raffle;
  const item = items[index];
  const winner = winners[index];

  const drawing = raffle.status === "drawing";
  const popped = drawing && round === index + 1;
  const faded = drawing && round !== index + 1;

  return (
    <ItemCard
      className={classNames("RaffleItemCard", `index-${index}-`, {
        popped,
        faded,
      })}
      item={item}
      tokenValue={item.lootValue}
      size={small ? "sm" : "md"}
      prefixSymbol
    >
      <Div
        fx
        justify="space-between"
        mb={6}
      >
        <Span
          size={small ? 11 : 13}
          weight="medium"
          color="white"
          family="title"
        >
          {index + 1}
        </Span>
        {winner ? (
          <Div
            align="center"
            gap={4}
          >
            <UserBadge
              xp={winner.xp}
              fontSize={small ? 11 : 12}
            />
            <Span
              size={small ? 11 : 12}
              weight="medium"
              color="white"
            >
              {winner.name}
            </Span>
          </Div>
        ) : (
          <Div>
            <Span
              size={small ? 11 : 13}
              weight="medium"
              color="dark-gray"
            >
              {"TBD"}
            </Span>
          </Div>
        )}
      </Div>
    </ItemCard>
  );
};
