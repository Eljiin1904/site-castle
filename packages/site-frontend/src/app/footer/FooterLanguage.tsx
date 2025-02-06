import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgFlagEnglish } from "@client/svgs/flags/SvgFlagEnglish";

export const FooterLanguage = ({ fx }: { fx?: boolean }) => {
  return (
    <Dropdown
      type="select"
      buttonKind="secondary"
      fx={fx}
      options={[{ label: "English", icon: SvgFlagEnglish }]}
      value={0}
      onChange={() => {}}
    />
  );
};
