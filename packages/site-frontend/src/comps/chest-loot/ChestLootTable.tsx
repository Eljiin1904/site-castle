import { memo } from "react";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { ChestLootCard } from "./ChestLootCard";

export const ChestLootTable = memo(
  ({ chest, layout }: { chest: ChestDocument; layout: Layout }) => {
    return (
      <Div
        column
        fx
        gap={20}
        mt={layout === "mobile" ? undefined : 36}
      >
        <PageTitle
          heading="Case Contains"
        />
        <Div
          flexFlow="row-wrap"
          gap={layout === "mobile" ? 20 : 24}
        >
          {chest.items.map((x, i) => (
            <ChestLootCard
              key={i}
              chest={chest}
              item={x}
              layout={layout}
            />
          ))}
        </Div>
      </Div>
    );
  },
);
