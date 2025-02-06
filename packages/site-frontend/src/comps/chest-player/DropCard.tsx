import classNames from "classnames";
import { ChestDropDocument } from "@core/types/chests/ChestDropDocument";
import { Div } from "@client/comps/div/Div";
import { ItemCard } from "@client/comps/item/ItemCard";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import "./DropCard.scss";

export const DropCardPlaceholder = () => {
  return <Placeholder className="DropCardPlaceholder" />;
};

export const DropCard = ({
  drop,
  inserted,
}: {
  drop: ChestDropDocument;
  inserted: boolean | undefined;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";
  const { username, xp, hideInfo } = useHiddenInfo(drop.user);

  return (
    <ItemCard
      className={classNames("DropCard", { inserted })}
      item={drop.loot}
      tokenValue={drop.loot.lootValue}
      size={small ? "sm" : "md"}
      prefixSymbol
      position="absolute"
      fy
      fx
    >
      <Div
        align="center"
        gap={4}
        mt={6}
      >
        {!drop.user.bot && !hideInfo && (
          <UserBadge
            xp={xp}
            fontSize={small ? 11 : 12}
          />
        )}
        <Span
          size={small ? 11 : 13}
          weight="medium"
          color={hideInfo ? "gray" : "white"}
          textOverflow="ellipsis"
        >
          {username}
        </Span>
      </Div>
    </ItemCard>
  );
};
