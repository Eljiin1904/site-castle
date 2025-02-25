import { FC, useState } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { Vector } from "@client/comps/vector/Vector";
import { useSoundVolume } from "@client/hooks/sounds/useSoundVolume";
import { SvgSound } from "@client/svgs/common/SvgSound";
import { SvgSoundMax } from "@client/svgs/common/SvgSoundMax";
import { SvgSoundOff } from "@client/svgs/common/SvgSoundOff";
import { SvgSoundOn } from "@client/svgs/common/SvgSoundOn";
import { Slider } from "@client/comps/slider/Slider";

export type VolumeDropdownProps = {
  prefix: string;
  kind?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "quinary"
    | "custom"
    | "primary-black"
    | "secondary-black"
    | "primary-yellow"
    | "secondary-yellow"
    | "tertiary-grey"
    | "tertiary-black-overlay"
    | "tertiary-white-overlay";
  iconColor?: Color;
};

export const VolumeDropdown: FC<VolumeDropdownProps> = ({ prefix, kind, iconColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useSoundVolume(prefix);

  const getButtonIcon = () => {
    switch (true) {
      case volume === 0:
        return SvgSoundOff;
      case volume > 0 && volume < 1:
        return SvgSoundOn;
      case volume === 1:
        return SvgSoundMax;
      default:
        return SvgSound;
    }
  };

  return (
    <Dropdown
      className="VolumeDropdown"
      type="custom"
      menuWidth="150px"
      forceAlign="right"
      clampHeight
      open={isOpen}
      onToggle={() => {
        setIsOpen(!isOpen);
      }}
      button={
        <Button
          kind="quinary"
          icon={getButtonIcon()}
        />
      }
      body={
        <DropdownBody
          p={12}
          bg="brown-5"
          borderColor="brown-4"
        >
          <Div
            fx
            justify="space-between"
            align="center"
            pr={2}
          >
            <Vector
              as={SvgSound}
              color="yellow"
              size={18}
              pr={6}
            />
            <Slider
              type="single"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(x) => setVolume(x / 100)}
            />
          </Div>
        </DropdownBody>
      }
    />
  );
};
