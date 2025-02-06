import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";

export const WalletBanner = () => {
  return (
    <Div
      className="wallet-banner"
      bg="brown-8"
    >
      <Img
        type="jpg"
        path="/graphics/wallet-banner"
        width="320px"
        height="604px"
        position="absolute"
        left={0}
        top={0}
      />
      <Div
        position="absolute"
        left={16}
        top={16}
        justify="center"
      >
        <Vector
          as={SvgSiteLogo}
          width={171}
          height={28}
        />
      </Div>
    </Div>
  );
};
