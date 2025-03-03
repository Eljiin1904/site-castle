import { Div } from "@client/comps/div/Div";
import { getProfileComp } from "./useProfileData";

export const ProfileContent = ({ selectedItem }: { selectedItem: any }) => {
  return (
    <Div
      className="content"
      width={"full"}
    >
      {getProfileComp(selectedItem)}
    </Div>
  );
};
