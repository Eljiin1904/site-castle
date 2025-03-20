import { Img } from "@client/comps/img/Img";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import "./BaseBanner.scss";

export const ProviderBanner = ({
  image,
  ratio
}: {
  image: string;
  heading?: string;
  ratio?: string;
}) => {

  const small = useIsMobileLayout();
  return (
    <Div className="BaseBanner"
      fx
      px={small ? 20 : 40}
      py={small ? 20 : 40}
      border
      borderColor="brown-4"
    >
    <Img
      type="png"
      path={image}
      skeleton
      width="100%"
      objectFit="contain"
      height={"40px"}
      aspectRatio={ratio || "100 / 20"}
    />
  </Div>
  );
};
