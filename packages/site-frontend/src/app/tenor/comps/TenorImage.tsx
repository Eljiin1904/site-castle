import { useSendGifAsMessage } from "#app/app/chat/hooks/useSendGifAsMessage";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { TenorImage } from "@core/types/tenor/TenorImage";

/**
 * Display an image fetched from tenor. When clicked, it will send the image as a message in the chat
 * and close the emoji menu.
 * @param TenorImage image to display
 * @param () => void onClick function to call when the image is clicked, it should close the emoji menu
 * @returns 
 */
export const TenorImageOption = ({image, onClick}: {
  image: TenorImage,
  onClick: () => void;
}) => {

  const sendGif = useSendGifAsMessage();
  const handleClick = () => {

    sendGif(image.image);
    onClick();
  };

  return (<Div
    className="TenorImageOption"
    onClick={handleClick}
    style={{width: '149px'}}
    cursor="pointer"
    >
      <Img type="external" path={image.preview_image} alt={image.alt ?? ''} width="100%" height="100%"/>
  </Div>);
};