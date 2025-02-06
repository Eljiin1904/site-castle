import { Img } from "@client/comps/img/Img";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const PageBanner = ({
  image,
  heading,
  description,
  content,
}: {
  image: string;
  heading: string | JSX.Element;
  description: string;
  content: JSX.Element;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      fx
      border
      overflow="hidden"
    >
      <Img
        type="jpg"
        path={`${image}_${layout}`}
        width="100%"
        height={small ? "200px" : "240px"}
        skeleton
      />
      <Div
        position="absolute"
        fx
        fy
        column
        p={small ? 24 : 32}
      >
        <Div
          column
          grow
          gap={16}
        >
          <Heading
            as="h2"
            size={small ? 18 : 28}
          >
            {heading}
          </Heading>
          <Span
            color={small ? "light-gray" : "gray"}
            size={small ? 13 : 14}
            style={{ maxWidth: "280px" }}
          >
            {description}
          </Span>
        </Div>
        {content}
      </Div>
    </Div>
  );
};
