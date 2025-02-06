import { Fragment } from "react";
import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleReelDivider } from "./BattleReelDivider";
import "./BattleViewBox.scss";

export const BattleViewBox = ({
  className,
  shadow,
  children,
}: {
  className?: string;
  shadow?: boolean;
  children: any;
}) => {
  const players = useAppSelector((x) => x.battlePlayer.players);

  return (
    <Div
      className={classNames("BattleViewBox", className)}
      fx
      border
    >
      {players.map((player, seat) => (
        <Fragment key={seat}>
          {seat > 0 && <BattleReelDivider seat={seat} />}
          <Div
            className="section"
            fx
          />
        </Fragment>
      ))}
      {shadow && (
        <Div
          className="shadow"
          position="absolute"
          fx
          fy
          center
          zIndex={2}
        />
      )}
      <Div
        className="inner-content"
        position="absolute"
        fx
        fy
        center
        zIndex={3}
      >
        {children}
      </Div>
    </Div>
  );
};
