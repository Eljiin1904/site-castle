import { ProfileInformation } from "./information/ProfileInformation";
import { ChangePassword } from "./password/ChangePassword";
import { ProfileSettings } from "./settings/ProfileSettings";
import { Div } from "@client/comps/div/Div";
import { SvgProfile } from "#app/svgs/common/SvgProfile";
import { SvgSecurity } from "#app/svgs/common/SvgSecurity";
import { SvgUnLock } from "#app/svgs/common/SvgUnLock";
import { SvgVerify } from "#app/svgs/common/SvgVerify";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { VerifyAccount } from "./verification/VerifyAccount";
import { PersonalInfo } from "./verification/PersonalInfo";
import { IdentityConfirmation } from "./verification/IdentityConfirmation";

import { SvgHourglass } from "@client/svgs/common/SvgHourglass";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgCancel } from "@client/svgs/common/SvgCancel";
import { FundsConfirmation } from "./verification/FundsConfirmation";
import { AddressConfirmation } from "./verification/AddressConfirmation";
import { ProfileSecurity } from "./security/ProfileSecurity";
import { SvgAnnouncement } from "@client/svgs/common/SvgAnnouncement";

export const navigationDetails: { icon: Svg; label: string; name: string; size: number }[] = [
  {
    icon: SvgProfile,
    label: "Profile Information",
    name: "profile_information",
    size: 16,
  },
  {
    icon: SvgUnLock,
    label: "Change Password",
    name: "change_password",
    size: 16,
  },
  {
    icon: SvgSecurity,
    label: "Security (2FA)",
    name: "security",
    size: 16,
  },
  {
    icon: SvgVerify,
    label: "Verify",
    name: "verify",
    size: 16,
  },
  {
    icon: SvgCog,
    label: "Settings",
    name: "settings",
    size: 16,
  },
];

export const getProfileComp = (selectedItem: string) => {
  let content;
  switch (selectedItem) {
    case "profile_information":
      content = <ProfileInformation />;
      break;
    case "change_password":
      content = <ChangePassword />;
      break;
    case "security":
      content = <ProfileSecurity />;
      break;
    case "verify":
      content = <VerifyAccount />;
      break;
    case "settings":
      content = <ProfileSettings />;
      break;
    default:
      content = <Div>Not Found</Div>;
  }
  return content;
};

export const profileSettingOptions: {
  id: string;
  label: string;
  message: string;
  name: string;
  action: string;
  buttonDetails?: string;
}[] = [
  {
    id: "marketCommunication",
    label: "Marketing Communication",
    message: "Receive marketing email notifications to your email",
    name: "marketing",
    action: "toggle",
  },
  {
    id: "genereralNotification",
    label: "General Notifications",
    message: "Receive general email notifications to your email",
    name: "general",
    action: "toggle",
  },
  {
    id: "transactionsNotification",
    label: "Deposit and withdraw notifications",
    message: "Receive deposit and withdraw notifications",
    name: "transactionsNotification",
    action: "toggle",
  },
  {
    id: "smsNotification",
    label: "Receive SMS notifications",
    message: "Receive your SMS notifications to mobile phone",
    name: "smsNotification",
    action: "toggle",
  },
  {
    id: "hiddenAccount",
    label: "Hidden Account",
    message: "Hide information related to User",
    name: "hiddenAccount",
    action: "toggle",
  },
  {
    id: "selfBan",
    label: "Set your own ban",
    message: "Set your own ban for a period of time",
    name: "ban",
    action: "button",
    buttonDetails: "Set Ban",
  },
  {
    id: "deleteAccount",
    label: "Delete your account",
    message: "Delete your account with all the data.",
    name: "delete",
    action: "button",
    buttonDetails: "Delete Account",
  },
];

export const verificationStepsData = [
  {
    name: "personal",
    label: "Personal",
    completed: false,
  },
  {
    name: "identify",
    label: "Identity",
    completed: false,
  },
  {
    name: "address",
    label: "Address",
    completed: false,
  },
  {
    name: "funds",
    label: "Funds",
    completed: false,
  },
];

export const getVerificationComp = (selectedItem: string, layout: string) => {
  let content;
  switch (selectedItem) {
    case "personal":
      content = <PersonalInfo layout={layout} />;
      break;
    case "identify":
      content = <IdentityConfirmation />;
      break;
    case "address":
      content = <AddressConfirmation />;
      break;
    case "funds":
      content = <FundsConfirmation />;
      break;

    default:
      content = <Div>Not Found</Div>;
  }
  return content;
};

export function identityStatusDetails(
  status: "pending" | "verified" | "denied" | "fully-verified",
): {
  icon: Svg;
  label: string;
  description: string;
  name: string;
  size: number;
} {
  let data;
  switch (status) {
    case "pending":
      data = {
        icon: SvgHourglass,
        label: "YOUR SOURCE OF FUNDS IS BEING VERIFIED",
        description:
          "We are verifying documents you have submitted. This might take  up to 5 business days!",
        name: "profile_information",
        size: 16,
      };
      break;
    case "verified":
      data = {
        icon: SvgCheckCircle,
        label: "YOUR SOURCE OF FUNDS IS VERIFIED",
        description:
          "Things for uploading your proof of source of funds documents! We have successfully verified your funds.",
        name: "change_password",
        size: 16,
      };
      break;
    case "denied":
      data = {
        icon: SvgCancel,
        label: "YOUR SOURCE OF FUNDS WAS NOT VERIFIED",
        description:
          "Thangs for uploading your proof of source of funds! We were not able to verify your address. Please reupload your documents and try again.",

        name: "security",
        size: 16,
      };
      break;
    case "fully-verified":
      data = {
        icon: SvgVerify,
        label: "YOU ARE FULLY VERIFIED",
        description:
          "You have fully verified your account! Now you can enjoy every aspect of the sandcasino.",
        name: "verify",

        size: 16,
      };
      break;
    default:
      data = {
        icon: SvgCancel,
        label: "YOUR SOURCE OF FUNDS WAS NOT VERIFIED",
        description:
          "Thangs for uploading your proof of source of funds! We were not able to verify your address. Please reupload your documents and try again.",

        name: "security",
        size: 16,
      };
  }
  return data;
}

export function addressStatusDetails(
  status: "pending" | "verified" | "denied" | "fully-verified",
): {
  icon: Svg;
  label: string;
  color?: string;
  description: string;
  name: string;
  size: number;
} {
  let data;
  switch (status) {
    case "pending":
      data = {
        icon: SvgHourglass,
        color: "brown-10",
        label: "YOUR SOURCE OF FUNDS IS BEING VERIFIED",
        description:
          "We are verifying documents you have submitted. This might take  up to 5 business days!",
        name: "profile_information",
        size: 16,
      };
      break;
    case "verified":
      data = {
        icon: SvgCheckCircle,
        color: "bright-green",
        label: "YOUR SOURCE OF FUNDS IS VERIFIED",
        description:
          "Things for uploading your proof of source of funds documents! We have successfully verified your funds.",
        name: "change_password",
        size: 16,
      };
      break;
    case "denied":
      data = {
        icon: SvgCancel,
        color: "bright-red",
        label: "YOUR SOURCE OF FUNDS WAS NOT VERIFIED",
        description:
          "Thangs for uploading your proof of source of funds! We were not able to verify your address. Please reupload your documents and try again.",

        name: "security",
        size: 16,
      };
      break;
    case "fully-verified":
      data = {
        icon: SvgVerify,
        color: "sand",
        label: "YOU ARE FULLY VERIFIED",
        description:
          "You have fully verified your account! Now you can enjoy every aspect of the sandcasino.",
        name: "verify",

        size: 16,
      };
      break;
    default:
      data = {
        icon: SvgAnnouncement,
        color: undefined,
        label: "NOT FOUND",
        description: "Please reach out to a represenative",

        name: "not-found",
        size: 16,
      };
  }
  return data;
}

export function fundsStatusDetails(status: "pending" | "verified" | "denied" | "fully-verified"): {
  icon: Svg;
  label: string;
  description: string;
  name: string;
  size: number;
} {
  let data;
  switch (status) {
    case "pending":
      data = {
        icon: SvgHourglass,
        label: "YOUR SOURCE OF FUNDS IS BEING VERIFIED",
        description:
          "We are verifying documents you have submitted. This might take  up to 5 business days!",
        name: "profile_information",
        size: 16,
      };
      break;
    case "verified":
      data = {
        icon: SvgCheckCircle,
        label: "YOUR SOURCE OF FUNDS IS VERIFIED",
        description:
          "Things for uploading your proof of source of funds documents! We have successfully verified your funds.",
        name: "change_password",
        size: 16,
      };
      break;
    case "denied":
      data = {
        icon: SvgCancel,
        label: "YOUR SOURCE OF FUNDS WAS NOT VERIFIED",
        description:
          "Thangs for uploading your proof of source of funds! We were not able to verify your address. Please reupload your documents and try again.",

        name: "security",
        size: 16,
      };
      break;
    case "fully-verified":
      data = {
        icon: SvgVerify,
        label: "YOU ARE FULLY VERIFIED",
        description:
          "You have fully verified your account! Now you can enjoy every aspect of the sandcasino.",
        name: "verify",

        size: 16,
      };
      break;
    default:
      data = {
        icon: SvgAnnouncement,

        label: "NOT FOUND",
        description: "Please Contact Us",

        name: "not-found",
        size: 16,
      };
  }
  return data;
}
