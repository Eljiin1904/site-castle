import { FC } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { Strings } from "@core/services/strings";
import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Button } from "@client/comps/button/Button";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { CaseBattles } from "#app/services/case-battles";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleChestGrid } from "./BattleChestGrid";
import { BattleRoundGrid } from "./BattleRoundGrid";
import { BattlePlayerGrid } from "./BattlePlayerGrid";
import { BattleResultBox } from "./BattleResultBox";
import { BattleStatusBox } from "./BattleStatusBox";
import "./BattleCard.scss";

type BattleCardProps = {
  battle: CaseBattleDocument;
  index: number;
  onJoinClick: (seat: number) => void;
};

export const BattleCardPlaceholder = () => {
  return <Placeholder className="BattleCard" />;
};

export const BattleCard: FC<BattleCardProps> = (props) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileContent {...props} />}
      tablet={<TabletContent {...props} />}
      laptop={<LaptopDesktopContent {...props} />}
      desktop={<LaptopDesktopContent {...props} />}
    />
  );
};

const MobileContent: FC<BattleCardProps> = ({ battle, onJoinClick }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={classNames("BattleCard")}
      column
      border
      bg="brown-6"
      onClick={() => navigate(`/case-battles/${battle._id}`)}
    >
      <Div
        column
        gap={12}
        px={12}
        py={12}
      >
        <Div fx>
          <Tokens
            value={battle.entryCost}
            mr={8}
          />
          <Span
            weight="semi-bold"
            color={
              battle.modifiers[0]
                ? CaseBattles.getModifierColor(battle.modifiers[0])
                : "gray"
            }
          >
            {CaseBattles.getModeCategory(battle.mode)}
          </Span>
          <Div
            ml={6}
            gap={4}
          >
            {battle.modifiers.map((modifier) => (
              <Vector
                key={modifier}
                as={CaseBattles.getModifierIcon(modifier)}
                size={15}
                color={CaseBattles.getModifierColor(modifier)}
                data-tooltip-id="app-tooltip"
                data-tooltip-content={Strings.kebabToTitle(modifier)}
              />
            ))}
          </Div>
          <Div grow />
          <Span weight="medium">
            {battle.status === "waiting"
              ? `${battle.roundCount} Rounds`
              : battle.status === "pending"
                ? "Starting"
                : battle.status === "simulating"
                  ? `Round ${battle.roundIndex + 1}/${battle.roundCount}`
                  : "Completed"}
          </Span>
        </Div>
        <Div
          fx
          justify="space-between"
        >
          <BattlePlayerGrid
            battle={battle}
            onJoinClick={onJoinClick}
          />
          {battle.status === "waiting" ? (
            <Button
              kind="primary"
              label="Join"
            />
          ) : (
            <Button
              kind="secondary"
              label="View"
            />
          )}
        </Div>
      </Div>
      <Div
        p={12}
        borderTop
        borderColor="brown-8"
      >
        {battle.status === "simulating" ? (
          <BattleRoundGrid battle={battle} />
        ) : (
          <BattleChestGrid battle={battle} />
        )}
      </Div>
    </Card>
  );
};

const TabletContent: FC<BattleCardProps> = ({ battle, onJoinClick }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={classNames("BattleCard")}
      column
      border
      bg="brown-6"
      onClick={() => navigate(`/case-battles/${battle._id}`)}
    >
      <Div
        px={16}
        py={12}
        align="center"
        justify="space-between"
      >
        <Div
          column
          gap={12}
        >
          <Div>
            <Tokens
              value={battle.entryCost}
              mr={8}
            />
            <Span
              weight="semi-bold"
              color={
                battle.modifiers[0]
                  ? CaseBattles.getModifierColor(battle.modifiers[0])
                  : "gray"
              }
            >
              {CaseBattles.getModeCategory(battle.mode)}
            </Span>
            <Div
              ml={6}
              gap={4}
            >
              {battle.modifiers.map((modifier) => (
                <Vector
                  key={modifier}
                  as={CaseBattles.getModifierIcon(modifier)}
                  size={15}
                  color={CaseBattles.getModifierColor(modifier)}
                  data-tooltip-id="app-tooltip"
                  data-tooltip-content={Strings.kebabToTitle(modifier)}
                />
              ))}
            </Div>
          </Div>
          <BattlePlayerGrid
            battle={battle}
            onJoinClick={onJoinClick}
          />
        </Div>
        {battle.status === "completed" ? (
          <BattleResultBox battle={battle} />
        ) : (
          <BattleStatusBox battle={battle} />
        )}
      </Div>
      <Div
        p={12}
        borderTop
        borderColor="brown-8"
      >
        {battle.status === "simulating" ? (
          <BattleRoundGrid battle={battle} />
        ) : (
          <BattleChestGrid battle={battle} />
        )}
      </Div>
    </Card>
  );
};

const LaptopDesktopContent: FC<BattleCardProps> = ({ battle, onJoinClick }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={classNames("BattleCard")}
      p={16}
      align="center"
      border
      bg="brown-6"
      hover="up"
      onClick={() => navigate(`/case-battles/${battle._id}`)}
    >
      <Div
        className="left-box"
        column
        gap={12}
      >
        <Div>
          <Tokens
            value={battle.entryCost}
            mr={8}
          />
          <Span
            weight="semi-bold"
            color={
              battle.modifiers[0]
                ? CaseBattles.getModifierColor(battle.modifiers[0])
                : "gray"
            }
          >
            {CaseBattles.getModeCategory(battle.mode)}
          </Span>
          <Div
            ml={6}
            gap={4}
          >
            {battle.modifiers.map((modifier) => (
              <Vector
                key={modifier}
                as={CaseBattles.getModifierIcon(modifier)}
                size={15}
                color={CaseBattles.getModifierColor(modifier)}
                data-tooltip-id="app-tooltip"
                data-tooltip-content={Strings.kebabToTitle(modifier)}
              />
            ))}
          </Div>
        </Div>
        <BattlePlayerGrid
          battle={battle}
          onJoinClick={onJoinClick}
        />
      </Div>
      {battle.status === "simulating" ? (
        <BattleRoundGrid battle={battle} />
      ) : (
        <BattleChestGrid battle={battle} />
      )}
      <Div
        className="right-box"
        justify="flex-end"
      >
        {battle.status === "completed" ? (
          <BattleResultBox battle={battle} />
        ) : (
          <BattleStatusBox battle={battle} />
        )}
      </Div>
    </Card>
  );
};
