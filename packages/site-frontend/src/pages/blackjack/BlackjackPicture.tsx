import { Img } from "@client/comps/img/Img";
import { convertPathToWebp } from "./utils/convertPathToWebp";

export type PictureProps = {
  src: string;
  alt?: string;
  className?: string;
};

export const BlackjackPicture = ({ src, alt, className = "" }: PictureProps) => {
  const webpPath = convertPathToWebp(src);
  return (
    <div className={className}>
      {/* <source
        type="image/webp"
        srcSet={webpPath}
      /> */}
      {/* <img
        src={src}
        alt={alt}
      /> */}
      <Img
        type="png"
        path={src}
        skeleton
        width="100%"
        // aspectRatio={"16 / 9"}
        // position="absolute"
      />
    </div>
  );
};
