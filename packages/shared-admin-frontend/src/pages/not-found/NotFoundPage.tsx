import { useNavigate } from "react-router-dom";
import { PageNotice } from "@client/comps/page/PageNotice";
import { SitePage } from "#app/comps/site-page/SitePage";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <SitePage
      className="NotFoundPage"
      title="404"
    >
      <PageNotice
        image="/graphics/notice-Chicken-404"
        title="Page Not Found"
        message="The page either does not exist or has been removed."
        buttonLabel="Take Me Home"
        onButtonClick={() => navigate("/")}
      />
    </SitePage>
  );
};
