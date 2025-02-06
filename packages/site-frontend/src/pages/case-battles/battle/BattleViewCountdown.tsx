import { useEffect, useState } from "react";
import { Numbers } from "@core/services/numbers";
import { Random } from "@core/services/random";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleViewBox } from "./BattleViewBox";

export const BattleViewCountdown = () => {
  const statusDate = useAppSelector((x) => x.battlePlayer.statusDate);
  const eosBlockNum = useAppSelector((x) => x.battlePlayer.eosBlockNum);

  return (
    <BattleViewBox shadow>
      <Div
        column
        center
        border
        p={16}
        bg="brown-6"
        gap={8}
      >
        <CountdownNumber date={statusDate} />
        <Div gap={4}>
          <Span size={12}>{"EOS Block"}</Span>
          <Link
            type="a"
            href={Random.getBlockUrl(eosBlockNum)}
            fontWeight="semi-bold"
            fontSize={12}
            color="light-blue"
          >
            {`#${eosBlockNum}`}
          </Link>
        </Div>
      </Div>
    </BattleViewBox>
  );
};

const CountdownNumber = ({ date }: { date: Date }) => {
  const [second, setSecond] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => setSecond((x) => --x), 1000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <Span
      family="title"
      weight="bold"
      size={32}
      color="white"
    >
      {Numbers.max(0, second)}
    </Span>
  );
};
