import { Img } from "@client/comps/img/Img";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./ProviderBanner.scss";
import { StyledProps } from "@client/comps/styled/Styled";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const ProviderBanner = ({
  image,
}: {
  image: string;
  heading?: string | undefined;
  ratio?: string | undefined;
  objectPositionHorizontal?: StyledProps["objectFitPosition"];
  objectPositionVertical?: StyledProps["objectFitPosition"];
}) => {

  const small = useIsMobileLayout();

  return (
    <Div className="ProviderBanner"
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
      height={small ? "40px" : "40px"}
    />
  </Div>
  );
};
