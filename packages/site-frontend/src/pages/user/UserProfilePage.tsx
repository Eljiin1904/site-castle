import { ProfileNavigator } from "#app/comps/profile/ProfileNavigator";
import { Div } from "@client/comps/div/Div";
import "./UserProfilePage.scss";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ProfileBanner } from "#app/comps/profile/ProfileBanner";
import { useState } from "react";
import { ProfileContent } from "#app/comps/profile/ProfileContent";
import { ProfileDropdowns } from "#app/comps/profile/ProfileDropdowns";

export const UserProfilePage: React.FC = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<MobileContent />}
      tablet={<MobileContent />}
      laptop={<NonMobileContent />}
      desktop={<NonMobileContent />}
    />
  );
};

const MobileContent = () => {
  return (
    <Div
      fx
      column
    >
      <ProfileBanner
        path={"/graphics/profile_banner_mobile"}
        label="Profile"
        width="1250"
        height="82"
        font_size={36}
      />
      <ProfileDropdowns />
    </Div>
  );
};

const NonMobileContent = () => {
  const [selectedItem, setSelectedItem] = useState("profile_information");

  return (
    <Div
      column
      width={"full"}
    >
      <ProfileBanner
        path={"/graphics/profile_banner"}
        label="Profile"
        width="1500"
        height="150"
        font_size={64}
      />
      <Div
        pt={40}
        pb={20}
      >
        <Div pl={15}>
          <ProfileNavigator
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </Div>
        <Div
          px={20}
          width={"full"}
        >
          <ProfileContent selectedItem={selectedItem} />
        </Div>
      </Div>
    </Div>
  );
};
