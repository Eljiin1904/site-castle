import { FC } from "react";
import { useLibrarySelector } from "#client/hooks/store/useLibrarySelector";
import { Div } from "../div/Div";
import { Heading } from "../heading/Heading";
import { StyledLayoutProps } from "../styled/Styled";
import { Vector } from "../vector/Vector";

export type PageTitleProps = StyledLayoutProps & {
  icon?: Svg;
  heading: string;
};

export const PageTitle: FC<PageTitleProps> = ({
  icon,
  heading,
  ...forwardProps
}) => {
  const mainLayout = useLibrarySelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";

  return (
    <Div
      fx
      align="center"
      gap={12}
      {...forwardProps}
    >
      {icon && (
        <Vector
          as={icon}
          size={small ? 20 : 24}
        />
      )}
      <Heading
        as="h2"
        size={small ? 20 : 24}
        fontWeight="regular"
        textTransform="uppercase"
      >
        {heading}
      </Heading>
    </Div>
  );
};