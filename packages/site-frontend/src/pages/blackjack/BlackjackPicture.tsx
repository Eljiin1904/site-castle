import { convertPathToWebp } from "./utils/convertPathToWebp";

export type PictureProps = {
  src: string;
  alt?: string;
  className?: string;
};

export const BlackjackPicture = ({
  src,
  alt,
  className = "",
}: PictureProps) => {
  const webpPath = convertPathToWebp(src);
  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet={webpPath}
      />
      <img
        src={src}
        alt={alt}
      />
    </picture>
  );
};
