import { BasicCaseBattle } from "@core/types/case-battles/BasicCaseBattle";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { CaseBattles } from "#app/services/case-battles";

export const CaseBattleLinkContent = ({
  battle,
}: {
  battle: BasicCaseBattle;
}) => {
  return (
    <Link
      type="router"
      to={`/case-battles/${battle.id}`}
      hover="none"
      mt={3}
    >
      <Button
        kind="secondary"
        size="xs"
      >
        <Div center>
          <Vector
            as={SvgBattle}
            size={13}
            color="yellow"
            mr={4}
          />
          <Span
            size={13}
            color="light-gray"
          >
            {CaseBattles.getModeCategory(battle.mode)}
          </Span>
          <Tokens
            value={battle.entryCost}
            fontSize={13}
            ml={6}
          />
        </Div>
      </Button>
    </Link>
  );
};
