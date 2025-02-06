import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LevelCaseCard, LevelCaseCardPlaceholder } from "./LevelCaseCard";

export const LevelCaseGrid = ({
  chests,
}: {
  chests: ChestDocument[] | undefined;
}) => {
  const keys = useAppSelector((x) => x.user.chestKeys);

  return (
    <Div
      fx
      flexFlow="row-wrap"
      gap={12}
    >
      {!chests &&
        [...Array(18)].map((x, i) => <LevelCaseCardPlaceholder key={i} />)}
      {chests &&
        chests.map((x) => (
          <LevelCaseCard
            key={x._id}
            chest={x}
            keys={keys[x._id] || 0}
          />
        ))}
    </Div>
  );
};
