import { Div } from "@client/comps/div/Div";
import { Divider } from "@client/comps/divider/Divider";

import { Vector } from "@client/comps/vector/Vector";
import { navigationDetails } from "./useProfileData";

export const ProfileNavigator = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: any;
  setSelectedItem: any;
}) => {
  const isActive = (navItem: string) => (selectedItem == navItem ? "sand" : "brown-10");
  return (
    <Div
      bg="brown-6"
      column
      px={20}
      style={{
        width: 275,
        height: 330,
      }}
      justify="center"
    >
      {navigationDetails.map((navDetail, index) => (
        <>
          <Div
            gap={16}
            my={20}
            key={index}
            onClick={() => setSelectedItem(navDetail.name)}
          >
            <Vector
              color={isActive(navDetail.name)}
              as={navDetail.icon}
              size={navDetail.size}
            />
            <Div color={isActive(navDetail.name)}>{navDetail.label} </Div>
          </Div>
          {index != navigationDetails.length - 1 && (
            <Divider
              as={"div"}
              px={16}
              borderColor={"brown-4"}
            />
          )}
        </>
      ))}
    </Div>
  );
};
