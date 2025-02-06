import { Random } from "@core/services/random";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const DoubleFairness = () => {
  const serverSeed = useAppSelector((x) => x.double.round.serverSeed);
  const serverSeedHash = useAppSelector(
    (x) => x.double.round.serverSeedHash || "",
  );
  const eosBlockNum = useAppSelector((x) => x.double.round.eosBlockNum || "");
  const eosBlockId = useAppSelector((x) => x.double.round.eosBlockId || "");

  return (
    <Div
      fx
      column
      pt={24}
      gap={16}
      borderTop
    >
      <Div
        fx
        column
        gap={8}
      >
        <FairnessLine
          label="Server Seed Hash"
          value={serverSeedHash}
        />
        {serverSeed && (
          <FairnessLine
            label="Server Seed"
            value={serverSeed}
          />
        )}
        <FairnessLine
          label="EOS Block"
          value={eosBlockNum}
          href={Random.getBlockUrl(eosBlockNum)}
        />
        <FairnessLine
          label="EOS Block ID"
          value={eosBlockId}
        />
      </Div>
    </Div>
  );
};

const FairnessLine = ({
  label,
  value,
  href,
}: {
  label: string;
  value: string | number;
  href?: string;
}) => {
  return (
    <Div
      fx
      gap={4}
    >
      <Span
        size={12}
        weight="semi-bold"
        color="dark-gray"
      >
        {label}
        {": "}
      </Span>
      {href ? (
        <Link
          type="a"
          href={href}
          fontSize={12}
          color="light-blue"
        >
          {value}
        </Link>
      ) : (
        <Span
          size={12}
          textOverflow="ellipsis"
          style={{ maxWidth: "60%" }}
        >
          {value}
        </Span>
      )}
    </Div>
  );
};
