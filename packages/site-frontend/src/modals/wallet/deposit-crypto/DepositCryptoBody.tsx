import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Button } from "@client/comps/button/Button";
import { Cryptos } from "#app/services/cryptos";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Heading } from "@client/comps/heading/Heading";
import { Link } from "@client/comps/link/Link";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";

export const DepositCryptoBody = () => {
  const [cryptoIndex, setCryptoIndex] = useState(0);
  const [rotate, setRotate] = useState(false);
  const { t } = useTranslation(["wallet"]);
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
       <ModalSection>
        <ModalLabel>{t('currency')}</ModalLabel>
        <Dropdown
            type="select"
            size="md"
            fx
            options={Cryptos.infos.map((x) => ({
              label: `${x.name} (${x.kind.replace("_", " ")})`,
              icon: Cryptos.getIcon(x.symbol),
            }))}
            value={cryptoIndex}
            onChange={(x, i) => setCryptoIndex(i)}
          />
      </ModalSection>

      <ModalSection>
        <ModalLabel>{t('depositAddress',{crypto: crypto.kind.replace("_", " ")})}</ModalLabel>
        {address ? <Div fx>
          <Div>
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
          </Div>
          <Button
            kind="tertiary-grey"
            label={t("common:copy")}
            onClick={() => {
              navigator.clipboard.writeText(address);
              Toasts.success('common:copied');
            }}
            flexGrow={1}
            size="xssso"
          />
        </Div> : <Span
            flexGrow
            color="gray"
            textOverflow="ellipsis"
          >
            {"..."}
          </Span>}
      </ModalSection>
      <Div border borderColor="brown-4" gap={20}>
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
        <Div fx column gap={8} p={20}>
          <Heading as="h3" size={20} >
            {t("depositInstructions.title")}
          </Heading>
          <Span size={12} weight="medium" lineHeight={20}>
          {t("depositInstructions.description")}
          </Span>
          <Link
            type="a"
            href={`#`}
            hover="none"
            gap={8}
          >
            {t("common:more")}
            <Vector
            className="icon left"
            as={SvgArrowRight}
            style={{transform: "rotate(270deg)"}}
            size={10}
            color="sand"
          />
        </Link>
        </Div>
      </Div>
    </Div>
  );
};
