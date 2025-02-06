import { useState } from "react";
import classNames from "classnames";
import { SiteActivityDocument } from "@core/types/site/SiteActivityDocument";
import { Items } from "@core/services/items";
import { ItemIcon } from "@client/comps/item/ItemIcon";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SvgQuestionCircle } from "@client/svgs/common/SvgQuestionCircle";
import { SvgMedal } from "@client/svgs/common/SvgMedal";
import { SvgSlide } from "@client/svgs/common/SvgSlide";
import { ItemBox } from "@client/comps/item/ItemBox";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgStar } from "@client/svgs/common/SvgStar";
import { SvgMultiplier } from "@client/svgs/common/SvgMultiplier";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import "./ActivityCard.scss";

export const ActivityCardPlaceholder = () => {
  return <Placeholder className="ActivityCardPlaceholder" />;
};

export const ActivityCard = ({
  activity,
  inserted,
  animate,
}: {
  activity: SiteActivityDocument;
  inserted: boolean | undefined;
  animate: boolean;
}) => {
  const { kind, user, amount } = activity;
  const [hovered, setHovered] = useState(false);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = ["mobile", "tablet"].includes(layout);
  const rarity = Items.getRarity(amount);
  const rarityIndex = Items.rarities.indexOf(rarity);
  const { username, xp, hideInfo } = useHiddenInfo(user);

  let image = "/icons/unknown";
  let label = "Unknown";
  let link = "/";
  let icon = SvgQuestionCircle;

  if (kind === "advent-item") {
    image = `/items/${activity.item.slug}`;
    label = "Advent Calendar";
    link = "/holiday/advent";
    icon = SvgStar;
  } else if (kind === "case-drop") {
    image = `/items/${activity.loot.slug}`;
    label = "Cases";
    link = `/cases/${activity.chest.slug}`;
    icon = SvgChest;
  } else if (kind === "case-battle-drop") {
    image = `/items/${activity.loot.slug}`;
    label = "Battles";
    link = `/case-battles/${activity.battleId}`;
    icon = SvgBattle;
  } else if (kind === "double-win") {
    image = `/icons/double-${activity.betKind}`;
    label = "Double";
    link = "/double";
    icon = SvgSlide;
  } else if (kind === "dice-win") {
    image = "/icons/dice-win";
    label = "Dice";
    link = "/dice";
    icon = SvgDice;
  } else if (kind === "limbo-win") {
    image = "/icons/limbo-win";
    label = "Limbo";
    link = "/limbo";
    icon = SvgMultiplier;
  } else if (kind === "reward-boost") {
    image = "/icons/reward-boost";
    label = "Reward Boosts";
    link = "/rewards/boosts";
    icon = SvgMedal;
  } else if (kind === "reward-gem-case-drop") {
    image = `/items/${activity.loot.slug}`;
    label = "Gem Cases";
    link = "/rewards/gems";
    icon = SvgMedal;
  } else if (kind === "reward-holiday-case-drop") {
    image = `/items/${activity.loot.slug}`;
    label = "Holiday Cases";
    link = "/holiday/store";
    icon = SvgStar;
  } else if (kind === "reward-level-case-drop") {
    image = `/items/${activity.loot.slug}`;
    label = "Level Up Cases";
    link = "/rewards/level-cases";
    icon = SvgMedal;
  }

  return (
    <Link
      className={classNames("ActivityCard", {
        inserted,
        animate,
        [`rarity-${rarityIndex}`]: rarityIndex !== undefined,
      })}
      position="absolute"
      type="router"
      to={link}
      hover="none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ItemBox
        alignItems="center"
        fx
        px={small ? 12 : 16}
        rarity={rarity}
      >
        <ItemIcon
          imageType="png"
          imagePath={image}
          size={small ? "36px" : "50px"}
          rarity={rarity}
        />
        <Div
          column
          align="flex-start"
          gap={8}
          ml={small ? 12 : 20}
        >
          <Tokens
            fontSize={small ? 12 : 13}
            value={amount}
          />
          <Div
            center
            gap={4}
          >
            {!user.bot && !hideInfo && (
              <UserBadge
                xp={xp}
                fontSize={small ? 11 : 12}
              />
            )}
            <Span
              className="username-text"
              size={small ? 11 : 12}
              weight="medium"
              color={hideInfo ? "gray" : "white"}
              textOverflow="ellipsis"
            >
              {username}
            </Span>
          </Div>
        </Div>
        {hovered && (
          <Div
            className="overlay-box"
            center
            gap={8}
          >
            <Vector
              as={icon}
              color="yellow"
              size={24}
            />
            <Span
              weight="semi-bold"
              color="white"
            >
              {label}
            </Span>
          </Div>
        )}
      </ItemBox>
    </Link>
  );
};
