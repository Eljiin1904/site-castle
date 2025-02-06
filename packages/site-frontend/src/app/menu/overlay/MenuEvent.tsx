import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";
import { Img } from "@client/comps/img/Img";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const MenuEvent = ({ onClick }: { onClick: () => void }) => {
  const holiday = useAppSelector((x) => x.site.meta.holiday);

  if (!holiday) {
    return null;
  }
  return (
    <Link
      display="flex"
      type="router"
      to="/holiday"
      fx
      px={16}
      py={12}
      alignItems="center"
      bg="brown-7"
      hover="none"
      onClick={onClick}
    >
      <Img
        type="png"
        path="/events/christmas/header-icon"
        width="32px"
      />
      <Div
        column
        ml={4}
        top={1}
      >
        <Span
          family="title"
          weight="bold"
          color="white"
          size={15}
        >
          {"500K"}
        </Span>
        <Span
          color="red"
          size={11}
        >
          {"Winter Event"}
        </Span>
      </Div>
    </Link>
  );
};
