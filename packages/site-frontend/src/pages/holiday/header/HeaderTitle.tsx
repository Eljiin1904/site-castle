import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const HeaderTitle = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      column
      pl={small ? 16 : 56}
      pb={small ? 48 : 100}
    >
      <Heading
        size={small ? 36 : 80}
        color="gold"
      >
        {"Over 500K"}
      </Heading>
      <Heading
        size={small ? 20 : 40}
        ml={4}
      >
        {"Winter Event"}
      </Heading>
    </Div>
  );
};
