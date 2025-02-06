import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { CaseBattles } from "#app/services/case-battles";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { ModifierCard } from "./ModifierCard";

export const ModifierSection = () => {
  const mode = useAppSelector((x) => x.battleCreate.mode);
  const modifiers = useAppSelector((x) => x.battleCreate.modifiers);
  const dispatch = useAppDispatch();

  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div mt={8}>
        <Heading>{"Modifiers"}</Heading>
      </Div>
      <Div
        fx
        gap={12}
        flow="row-wrap"
      >
        {CaseBattles.modifiers.map((x, i) => (
          <ModifierCard
            key={i}
            mode={mode}
            enabled={modifiers.includes(x)}
            modifier={x}
            onEnable={() => dispatch(CaseBattles.addModifier(x))}
            onDisable={() => dispatch(CaseBattles.removeModifier(x))}
          />
        ))}
      </Div>
    </Div>
  );
};
