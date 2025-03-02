import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import "./ProfileBanner.scss";
export const ProfileBanner = ({
  height,
  width,
  path,
  font_size,
  label,
}: {
  height: string;
  width: string;
  path: string;
  font_size: Unit;
  label: string;
}) => {
  return (
    <Div
      className="image_container"
      overflow="hidden"
      width={"full"}
    >
      <Img
        type="jpg"
        path={path}
        width={width}
        height={height}
        className="profile_banner_image"
      />
      <Div
        color="black"
        className="text-overlay"
        fontSize={font_size}
        textTransform="uppercase"
        fontWeight="bold"
        fontFamily="title"
      >
        {label}
      </Div>
    </Div>
  );
};
