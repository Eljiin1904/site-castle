import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const AppAnnouncement = () => {
  const announcement = useAppSelector((x) => x.site.settings.announcement);

  if (!announcement) {
    return null;
  }
  return (
    <Div
      className="AppAnnouncement"
      fx
      center
      p={8}
      bg="dark-orange"
    >
      <Span color="white">{announcement}</Span>
    </Div>
  );
};
