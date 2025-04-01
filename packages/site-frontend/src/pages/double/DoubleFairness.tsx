import { Random } from "@core/services/random";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const DoubleFairness = () => {
  const serverSeed = useAppSelector((x) => x.double.round.serverSeed);
  const serverSeedHash = useAppSelector(
    (x) => x.double.round.serverSeedHash || "",
  );
  const eosBlockNum = useAppSelector((x) => x.double.round.eosBlockNum || "");
  const eosBlockId = useAppSelector((x) => x.double.round.eosBlockId || "");
  const small = useIsMobileLayout();
  const {t} = useTranslation();

  return (
    <Div
      fx
      column
      pt={40}
      gap={16}
      borderTop
    >
      <Div
        fx
        column
        gap={small? 20: 8}
      >
        <FairnessLine
          label={t("games\\double:serverSeedHash")}
          value={serverSeedHash}
        />
        {serverSeed && (
          <FairnessLine
            label="Server Seed"
            value={serverSeed}
          />
        )}
        <FairnessLine
          label={t("games\\double:eosBlock")}
          value={eosBlockNum}
          href={Random.getBlockUrl(eosBlockNum)}
        />
        <FairnessLine
          label={t("games\\double:eosBlockId")}
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
  const small = useIsMobileLayout();
  return (
    <Div
      fx
      gap={4}
      column={small}
    >
      <Span>
        {label}
        {": "}
      </Span>
      {href ? (
        <Link
          type="a"
          href={href}
          fontSize={14}
          fontWeight="medium"
          color="sand"
          lineHeight={20}
          textDecoration="underline"
        >
          {value}
        </Link>
      ) : (
        <Span
          size={14}
          textOverflow="ellipsis"
          style={{ maxWidth: "60%" }}
          color="light-sand"
          lineHeight={20}
           fontWeight="medium"
        >
          {value}
        </Span>
      )}
    </Div>
  );
};
