import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgShield } from "@client/svgs/common/SvgShield";
import { SvgAge } from "@client/svgs/common/SvgAge";
import { WalletModal } from "#app/modals/wallet/WalletModal";
import { SvgFooterCryptos } from "#app/svgs/footer/SvgFooterCryptos";
import { SvgFooterMastercard } from "#app/svgs/footer/SvgFooterMastercard";
import { SvgFooterTrustPilot } from "#app/svgs/footer/SvgFooterTrustPilot";
import { SvgFooterVisa } from "#app/svgs/footer/SvgFooterVisa";
import { FooterPill } from "./FooterPill";
import { FooterLicense } from "./FooterLicense";

export const FooterPills = ({ wrap }: { wrap?: boolean }) => {
  return (
    <Div
      flexFlow={wrap ? "row-wrap" : undefined}
      gap={12}
    >
      <FooterPill
        type="router"
        to="/about/responsible-gaming"
      >
        <Div
          center
          p={12}
          bg="brown-5"
          borderRadius="full"
        >
          <Vector
            as={SvgAge}
            size={16}
            color="white"
          />
        </Div>
        <Div
          column
          gap={4}
        >
          <Span
            size={14}
            weight="semi-bold"
            color="gray"
          >
            {"18+ Only"}
          </Span>
          <Span
            size={12}
            weight="medium"
            color="dark-gray"
          >
            {"Game Responsibly"}
          </Span>
        </Div>
      </FooterPill>
      <FooterPill
        type="router"
        to="/fairness"
      >
        <Div
          center
          p={12}
          bg="brown-5"
          borderRadius="full"
        >
          <Vector
            as={SvgShield}
            size={16}
            color="white"
          />
        </Div>
        <Div
          column
          gap={4}
        >
          <Span
            size={14}
            weight="semi-bold"
            color="gray"
          >
            {"Provably Fair"}
          </Span>
          <Span
            size={12}
            weight="medium"
            color="dark-gray"
          >
            {"Blockchain-Powered"}
          </Span>
        </Div>
      </FooterPill>
      <FooterPill
        type="action"
        onClick={() => {}}
      >
        <FooterLicense />
      </FooterPill>
      <FooterPill
        type="a"
        href="https://www.trustpilot.com/review/chicken.gg"
      >
        <Vector
          as={SvgFooterTrustPilot}
          width={124}
          height={32}
          color="gray"
        />
      </FooterPill>
      <FooterPill
        type="action"
        onClick={() => Dialogs.open("primary", <WalletModal />)}
      >
        <Vector
          as={SvgFooterVisa}
          width={56}
          height={20}
          color="gray"
        />
        <Vector
          as={SvgFooterMastercard}
          width={40}
          height={38}
        />
        <Vector
          as={SvgFooterCryptos}
          width={72}
          height={32}
        />
      </FooterPill>
    </Div>
  );
};
