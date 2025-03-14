import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { FC } from "react";

export type BannerImageProps = {
  image: string;
  children: React.ReactNode;
};

export const ImageBanner: FC<BannerImageProps> = ({
  image,
  children,
})=> {

  const small = useIsMobileLayout();

  return (<Div
        fx
        overflow="hidden"
        hover="none"
      >
        <Img
          className="slide-img"
          type="jpg"
          path={`${image}`}
          width="100%"
          style={{ minHeight: small ? "260px" : "280px"}}
          skeleton
        />
        <Div
          position="absolute"
          fx
          fy
          column
          px={small ? 20 : 40}
          py={small ? 20 : 28}
        >
          {children}
        </Div>
      </Div>)
};