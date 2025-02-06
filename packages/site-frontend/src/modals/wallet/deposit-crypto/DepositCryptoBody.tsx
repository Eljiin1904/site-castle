import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Button } from "@client/comps/button/Button";
import { Cryptos } from "#app/services/cryptos";
import { WalletAction } from "../WalletAction";

export const DepositCryptoBody = ({
  setAction,
}: {
  setAction: (x: WalletAction) => void;
}) => {
  const [cryptoIndex, setCryptoIndex] = useState(0);
  const [rotate, setRotate] = useState(false);

  const crypto = Cryptos.infos[cryptoIndex];

  const { data, error } = useQuery({
    queryKey: [cryptoIndex, rotate],
    queryFn: () =>
      rotate
        ? Cryptos.rotateDepositAddress({
            kind: crypto.kind,
          })
        : Cryptos.getDepositAddress({
            kind: crypto.kind,
          }),
  });

  useEffect(() => {
    setRotate(false);
  }, [cryptoIndex]);

  useEffect(() => {
    if (error) {
      Toasts.error(error);
      setRotate(false);
    }
  }, [error]);

  const address = data?.address;

  return (
    <Div
      fx
      column
      gap={20}
    >
      <Dropdown
        type="select"
        fx
        options={Cryptos.infos.map((x) => ({
          label: x.name,
          description: x.kind.replace("_", " "),
          icon: Cryptos.getIcon(x.symbol),
        }))}
        value={cryptoIndex}
        onChange={(x, i) => setCryptoIndex(i)}
      />
      <ModalSection>
        <ModalLabel>{`Your ${crypto.kind.replace("_", " ")} deposit address`}</ModalLabel>
        {address ? (
          <ModalField>
            <Span
              flexGrow
              color="gray"
              textOverflow="ellipsis"
            >
              {address}
            </Span>
            <Vector
              as={SvgRedo}
              fontSize={18}
              color="white"
              ml={8}
              hover="highlight"
              onClick={() => setRotate(true)}
            />
            <Vector
              as={SvgCopy}
              fontSize={18}
              color="light-blue"
              ml={8}
              hover="highlight"
              onClick={() => {
                navigator.clipboard.writeText(address);
                Toasts.success("Wallet address copied to clipboard.");
              }}
            />
          </ModalField>
        ) : (
          <ModalField>
            <Span
              flexGrow
              color="gray"
              textOverflow="ellipsis"
            >
              {"..."}
            </Span>
          </ModalField>
        )}
      </ModalSection>
      <Div center>
        {address ? (
          <Div
            p={10}
            bg="white"
          >
            <QRCodeSVG value={address} />
          </Div>
        ) : (
          <Div
            bg="white"
            style={{ width: "148px", height: "148px" }}
          />
        )}
      </Div>
      <NoticeCard
        kind="info"
        message={`You will be credited after ${crypto.confirms} confirmation(s). Only send ${crypto.kind.replace("_", " ")} to this address.`}
      />
      <Div
        fx
        grow
        align="flex-end"
      >
        <Button
          fx
          kind="secondary"
          label="Back to Options"
          onClick={() => setAction("deposit")}
        />
      </Div>
    </Div>
  );
};
