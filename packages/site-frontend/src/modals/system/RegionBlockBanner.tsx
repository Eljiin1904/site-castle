import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";

export const RegionBlockBanner = () => {
  return (
    <Div
      className="region-block-banner"
      bg="brown-8"
    >
      <Img
        type="png"
        path={`/graphics/region-block-banner`}
        width="369px"
        height={"518px"}
        position="absolute"
        left={0}
        top={0}
      />
    </Div>
  );
};