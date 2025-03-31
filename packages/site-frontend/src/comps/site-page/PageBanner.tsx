import { Img } from "@client/comps/img/Img";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const PageBanner = ({
  image,
  heading,
  description,
  content,
}: {
  image: string;
  heading: string | JSX.Element;
  description?: string;
  content?: JSX.Element;
}) => {

  const small = useIsMobileLayout();
  

  return (
    <Div
      fx
    >
      <Img
        type="jpg"
        path={`${image}`}
        width="100%"
        height={small ? "80px" : "136px"}
        skeleton
      />
      <Div
        position="absolute"
        fx
        fy
        column
        p={small ? 20 : 40}
      >
        <Div
          column
          grow
          gap={16}
        >
         <Heading
            as={"h2"}
            color={"dark-brown"}
            size={small ? 32 : 64}
            lineHeight={small ? 32 : 56}
            fontWeight="regular"
            textTransform="uppercase"
          >
            {heading}
          </Heading>
         {description &&  <Span
            color={"dark-brown"}
            style={{ maxWidth: small ? "200px" : "550px" }}
            fontSize={small ? 12 : 16}
            fontWeight="medium"
          >
            {description}
          </Span>}
        </Div>
        {content}
      </Div>
    </Div>
  );
};
