import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Img } from "@client/comps/img/Img";
import { Heading } from "@client/comps/heading/Heading";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { SvgCS2 } from "@client/svgs/brands/SvgCS2";
import { SvgWalletCards } from "#app/svgs/wallet/SvgWalletCards";
import { SvgWalletCryptos } from "#app/svgs/wallet/SvgWalletCryptos";
import { SvgWalletKinguin } from "#app/svgs/wallet/SvgWalletKinguin";
import { SvgWalletPulse } from "#app/svgs/wallet/SvgWalletPulse";
import { SvgWalletSwapped } from "#app/svgs/wallet/SvgWalletSwapped";
import { SvgWalletGooglePay } from "#app/svgs/wallet/SvgWalletGooglePay";
import { SvgWalletApplePay } from "#app/svgs/wallet/SvgWalletApplePay";
import { SvgWalletPayPal } from "#app/svgs/wallet/SvgWalletPayPal";
import { DepositPulseModal } from "../deposit-pulse/DepositPulseModal";
import { DepositKinguinModal } from "../deposit-kinguin/DepositKinguinModal";
import { DepositSwappedModal } from "../deposit-swapped/DepositSwappedModal";
import { OptionPill } from "../OptionPill";
import { WalletAction } from "../WalletAction";

type Filter = "cards" | "paypal" | "google" | "apple";

export const DepositBody = ({
  setAction,
  setOpen,
}: {
  setAction: (x: WalletAction) => void;
  setOpen: (x: WalletAction) => void;
}) => {
  const [filter, setFilter] = useState<Filter>();
  const navigate = useNavigate();

  return (
    <Div
      fx
      grow
      column
      overflow="auto"
      gap={16}
    >
      {filter && (
        <Heading as="h2">
          {
            {
              cards: "Visa / Mastercard Options",
              paypal: "PayPal Options",
              google: "Google Pay Options",
              apple: "Apple Pay Options",
            }[filter]
          }
        </Heading>
      )}
      <Div
        fx
        overflow="auto"
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
          pill="0% Fees"
          description="Recommended"
          hidden={filter !== undefined}
          onClick={() => setAction("depositCrypto")}
        />
        <OptionPill
          icon={
            <Vector
              as={SvgCS2}
              size={44}
            />
          }
          label="Skins"
          hidden={filter !== undefined}
          onClick={() => {
            navigate("/marketplace/deposit");
            Dialogs.close("primary");
          }}
        />
        <OptionPill
          icon={
            <Vector
              as={SvgWalletCards}
              size={44}
            />
          }
          label="Visa / Mastercard"
          hidden={filter !== undefined}
          onClick={() => setFilter("cards")}
        />
        <OptionPill
          icon={
            <Vector
              as={SvgWalletPayPal}
              size={38}
            />
          }
          label="PayPal"
          hidden={filter !== undefined}
          onClick={() => setFilter("paypal")}
        />
        <OptionPill
          icon={
            <Vector
              as={SvgWalletApplePay}
              size={44}
            />
          }
          label="Apple Pay"
          hidden={filter !== undefined}
          onClick={() => setFilter("apple")}
        />
        <OptionPill
          icon={
            <Vector
              as={SvgWalletGooglePay}
              size={44}
            />
          }
          label="Google Pay"
          hidden={filter !== undefined}
          onClick={() => setFilter("google")}
        />
        <OptionPill
          icon={
            <Vector
              as={SvgWalletSwapped}
              size={36}
            />
          }
          label="Swapped"
          pill={filter ? "Best Method" : undefined}
          description={filter ? "Recommended" : undefined}
          hidden={
            filter !== undefined &&
            !["cards", "google", "apple"].includes(filter)
          }
          onClick={() =>
            Dialogs.open(
              "primary",
              <DepositSwappedModal onClose={() => setOpen("deposit")} />,
            )
          }
        />
        <OptionPill
          icon={
            <Vector
              as={SvgWalletKinguin}
              size={36}
            />
          }
          label="Kinguin"
          pill={filter === "paypal" ? "Best Method" : undefined}
          description={filter === "paypal" ? "Recommended" : undefined}
          hidden={
            filter !== undefined &&
            !["cards", "paypal", "google", "apple"].includes(filter)
          }
          onClick={() =>
            Dialogs.open(
              "primary",
              <DepositKinguinModal
                onRedeemClick={() => setOpen("depositGiftCard")}
                onClose={() => setOpen("deposit")}
              />,
            )
          }
        />
        <OptionPill
          icon={
            <Vector
              as={SvgWalletPulse}
              size={38}
            />
          }
          label="Pulse"
          hidden={
            filter !== undefined &&
            !["cards", "paypal", "google", "apple"].includes(filter)
          }
          onClick={() =>
            Dialogs.open(
              "primary",
              <DepositPulseModal onClose={() => setOpen("deposit")} />,
            )
          }
        />
        <OptionPill
          icon={
            <Img
              type="png"
              path="/graphics/gift-card"
              width="40px"
            />
          }
          label="Redeem Gift Card"
          hidden={filter !== undefined}
          onClick={() => setAction("depositGiftCard")}
        />
        <OptionPill
          icon={
            <Img
              type="png"
              path="/graphics/promo-ticket"
              width="40px"
            />
          }
          label="Redeem Promo Code"
          hidden={filter !== undefined}
          onClick={() => setAction("depositPromotion")}
        />
      </Div>
      {filter && (
        <Div
          fx
          grow
          column
          justify="flex-end"
          gap={16}
        >
          <Button
            kind="secondary"
            label="Back to Options"
            fx
            onClick={() => setFilter(undefined)}
          />
        </Div>
      )}
    </Div>
  );
};
