import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgEdit } from "@client/svgs/common/SvgEdit";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useRecreate } from "./useRecreate";
import { useRecreateCopy } from "./useRecreateCopy";
import { BattleRoundSlide } from "./BattleRoundSlide";
import "./BattleRounds.scss";

export const BattleRounds = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";
  const status = useAppSelector((x) => x.battlePlayer.status);
  const roundIndex = useAppSelector((x) => x.battlePlayer.roundIndex);
  const chests = useAppSelector((x) => x.battlePlayer.chestByRound);
  const activeChest = chests[roundIndex];
  const totalWon = useAppSelector((x) => x.battlePlayer.totalWon || 0);
  const processing = useAppSelector((x) => x.battlePlayer.processing);

  const handleRecreate = useRecreate();
  const handleRecreateCopy = useRecreateCopy();

  const displayChests = [
    chests[roundIndex - 4],
    chests[roundIndex - 3],
    chests[roundIndex - 2],
    chests[roundIndex - 1],
    chests[roundIndex],
    chests[roundIndex + 1],
    chests[roundIndex + 2],
    chests[roundIndex + 3],
    chests[roundIndex + 4],
  ];

  let leftContent;

  if (status === "waiting" || status === "pending") {
    leftContent = (
      <Span
        weight="semi-bold"
        size={small ? 11 : 14}
      >
        {`${chests.length} Rounds`}
      </Span>
    );
  } else if (status === "simulating") {
    leftContent = (
      <Span
        weight="semi-bold"
        size={small ? 11 : 14}
      >
        {`Round ${roundIndex + 1}/${chests.length}`}
      </Span>
    );
  } else if (status === "completed") {
    leftContent = (
      <Span
        weight="semi-bold"
        size={small ? 11 : 14}
      >
        {"Battle Complete"}
      </Span>
    );
  }

  let rightContent;

  if (status === "completed") {
    rightContent = (
      <Div
        gap={small ? 3 : 8}
        column={small}
        align="flex-end"
      >
        <Span size={small ? 11 : 14}>{"Total Won"}</Span>
        <Tokens
          value={totalWon}
          fontSize={small ? 11 : 14}
        />
      </Div>
    );
  } else {
    rightContent = (
      <Div
        fx
        gap={small ? 3 : 8}
        column={small}
        align="flex-end"
        justify="flex-end"
      >
        <Span
          size={small ? 11 : 14}
          textOverflow="ellipsis"
        >
          {activeChest.displayName}
        </Span>
        <Tokens
          value={activeChest.openCost}
          fontSize={small ? 11 : 14}
        />
      </Div>
    );
  }

  let middleContent;

  if (status === "completed") {
    middleContent = (
      <Div gap={2}>
        <Button
          kind="primary"
          size="sm"
          label={small ? "Recreate" : "Recreate Battle"}
          icon={SvgRedo}
          disabled={processing}
          onClick={handleRecreate}
        />
        <Button
          kind="primary"
          size="sm"
          icon={SvgEdit}
          disabled={processing}
          onClick={handleRecreateCopy}
        />
      </Div>
    );
  } else {
    middleContent = (
      <Div
        className="chests"
        fx
        fy
        center
      >
        {displayChests.map((x, i) =>
          x === undefined ? (
            <Div
              key={roundIndex - 4 + i}
              width={40}
            />
          ) : (
            <BattleRoundSlide
              key={roundIndex - 4 + i}
              chest={x}
              index={i}
            />
          ),
        )}
      </Div>
    );
  }

  return (
    <Card className="BattleRounds">
      <Div
        className="left-box"
        p={small ? 12 : 16}
        justify="flex-start"
        align="center"
      >
        {leftContent}
      </Div>
      <Div
        className="middle-box"
        center
      >
        {middleContent}
      </Div>
      <Div
        className="right-box"
        p={small ? 12 : 16}
        justify="flex-end"
        align="center"
      >
        {rightContent}
      </Div>
    </Card>
  );
};
