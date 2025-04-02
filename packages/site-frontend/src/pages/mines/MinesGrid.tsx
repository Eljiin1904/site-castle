import { memo, useMemo } from "react";
import { Div } from "#client/comps/div/Div";
import { Mines } from "#app/services/mines";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MinesGridCard } from "./MinesGridCard";

export const MinesGrid = memo(() => {
  const mode = useAppSelector((x) => x.mines.mode);
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const game = useAppSelector((x) => x.mines.game);
  const autoIndexes = useAppSelector((x) => x.mines.autoIndexes);
  const animateIndexes = useAppSelector((x) => x.mines.animateIndexes);
  const inputQueue = useAppSelector((x) => x.mines.inputQueue);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const sm = layout === "mobile";

  const tiles = useMemo(
    () =>
      [...Array(Mines.getTileCount(gridSize))].map((x, i) => {
        const mined = game?.mines.includes(i);

        return {
          index: i,
          mode,
          hasGame: !!game,
          completed: game?.completed,
          mined,
          revealed: game?.reveals.includes(i),
          autoSelected: mode === "auto" && autoIndexes.includes(i),
          queued: inputQueue.includes(i),
          animating: !mined && animateIndexes.includes(i),
        };
      }),
    [mode, gridSize, game, autoIndexes, animateIndexes, inputQueue],
  );

  return (
    <Div
      className="MinesGrid"
      center
      fy
    >
      <Div
        display="grid"
        p={sm ? 14 : 32}
        gap={6}
        style={{
          maxHeight: sm ? "350px" : "604px",
          aspectRatio: 1,
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 120px))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 120px))`,
        }}
      >
        {tiles.map((x, i) => (
          <MinesGridCard
            key={i}
            {...x}
          />
        ))}
      </Div>
    </Div>
  );
});
