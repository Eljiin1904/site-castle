import { CaseBattleMode } from "@core/types/case-battles/CaseBattleMode";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { SvgRifle } from "@client/svgs/common/SvgRifle";
import { SvgTeam } from "@client/svgs/common/SvgTeam";
import { SvgUsers } from "@client/svgs/common/SvgUsers";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { CaseBattles } from "#app/services/case-battles";
import { ModeCard } from "./ModeCard";

export const ModeSection = () => {
  const mode = useAppSelector((x) => x.battleCreate.mode);
  const dispatch = useAppDispatch();

  const ffa: CaseBattleMode[] = ["1v1", "3-way", "4-way"];
  const team: CaseBattleMode[] = ["2v2"];
  const group: CaseBattleMode[] = ["2p", "3p", "4p"];

  const setMode = (x: CaseBattleMode) => {
    dispatch(CaseBattles.setMode(x));
  };

  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div
        fx
        column
        gap={8}
      >
        <Heading>{"Teams"}</Heading>
        <Span>{"Select team mode and player count"}</Span>
      </Div>
      <Div
        fx
        gap={12}
        flow="row-wrap"
      >
        <ModeCard
          icon={SvgRifle}
          heading="FFA Battle"
          options={ffa}
          value={ffa.indexOf(mode)}
          setValue={(x) => setMode(ffa[x])}
        />
        <ModeCard
          icon={SvgUsers}
          heading="Team Battle"
          options={team}
          value={team.indexOf(mode)}
          setValue={(x) => setMode(team[x])}
        />
        <ModeCard
          icon={SvgTeam}
          heading="Group Unbox"
          options={group}
          value={group.indexOf(mode)}
          setValue={(x) => setMode(group[x])}
        />
      </Div>
    </Div>
  );
};
