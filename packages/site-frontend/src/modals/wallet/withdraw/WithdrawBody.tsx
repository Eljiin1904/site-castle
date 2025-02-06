import { useNavigate } from "react-router-dom";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgCS2 } from "@client/svgs/brands/SvgCS2";
import { SvgWalletCryptos } from "#app/svgs/wallet/SvgWalletCryptos";
import { OptionPill } from "../OptionPill";
import { WalletAction } from "../WalletAction";

export const WithdrawBody = ({
  setAction,
}: {
  setAction: (x: WalletAction) => void;
}) => {
  const navigate = useNavigate();

  return (
    <Div
      fx
      column
      overflow="auto"
      gap={16}
    >
      <Div
        fx
        flexFlow="row-wrap"
        gap={12}
      >
        <OptionPill
          icon={
            <Vector
              as={SvgWalletCryptos}
              size={48}
            />
          }
          label="Crypto"
          onClick={() => {
            setAction("withdrawCrypto");
          }}
        />
        <OptionPill
          icon={
            <Vector
              as={SvgCS2}
              size={44}
            />
          }
          label="Skins"
          onClick={() => {
            navigate("/marketplace");
            Dialogs.close("primary");
          }}
        />
      </Div>
    </Div>
  );
};
