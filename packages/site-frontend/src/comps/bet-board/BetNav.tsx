import classNames from "classnames";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./BetNav.scss";

export const BetNav = ({
  scope,
  setScope,
}: {
  scope: SiteBetScope;
  setScope: (x: SiteBetScope) => void;
}) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);

  return (
    <Div
      className="BetNav"
      fx
      gap={24}
      borderBottom
    >
      <NavItem
        scope="all"
        active={scope === "all"}
        onClick={() => setScope("all")}
      />
      <NavItem
        scope="highroller"
        active={scope === "highroller"}
        onClick={() => setScope("highroller")}
      />
      {authenticated && (
        <NavItem
          scope="user"
          active={scope === "user"}
          onClick={() => setScope("user")}
        />
      )}
    </Div>
  );
};

const NavItem = ({
  scope,
  active,
  onClick,
}: {
  scope: SiteBetScope;
  active: boolean;
  onClick: () => void;
}) => {
  let label = "Unknown";

  if (scope === "all") {
    label = "All Bets";
  } else if (scope === "highroller") {
    label = "High Rollers";
  } else if (scope === "user") {
    label = "My Bets";
  }

  return (
    <Div
      className={classNames("nav-item", { active })}
      px={12}
      pb={12}
      top={1}
      onClick={onClick}
    >
      <Span
        className="label"
        weight="semi-bold"
      >
        {label}
      </Span>
    </Div>
  );
};
