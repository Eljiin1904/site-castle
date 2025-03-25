import { FC } from "react";
import classNames from "classnames";
import { Birthday } from "@core/types/utility/Birthday";
import { Utility } from "#client/services/utility";
import { Div } from "../div/Div";
import { StyledLayoutProps } from "../styled/Styled";
import { IntegerInput } from "./IntegerInput";
import { Dropdown } from "../dropdown/Dropdown";
import { Span } from "../span/Span";
import "./DobInput.scss";
import { useTranslation } from "@core/services/internationalization/internationalization";

export type DobInputProps = StyledLayoutProps & {
  value: Birthday | undefined;
  width?: "full" | Unit;
  disabled?: boolean;
  error?: string;
  onChange: (x: Birthday | undefined) => void;
};

export const DobInput: FC<DobInputProps> = ({
  className,
  value,
  width = "full",
  disabled,
  error,
  onChange,
}) => {
  const {t} = useTranslation(["common"]);
  const handleChange = (key: keyof Birthday, x: number | undefined) => {
    if (!value) {
      value = { day: 0, month: 1, year: 0 };
    }
    value[key] = x || 0;
    onChange({ ...value });
  };

  return (
    <Div
      className={classNames("DobInput", className, {
        error: error !== undefined,
      })}
      gap={8}
      width={width}
    >
      <IntegerInput
        maxLength={2}
        placeholder={t("common:fields.dob.day")}
        disabled={disabled}
        value={value?.day === 0 ? undefined : value?.day}
        onChange={(x) => handleChange("day", x)}
      />
      <Dropdown
        type="select"
        options={Utility.months.slice()}
        value={value?.month ? value.month - 1 : 0}
        onChange={(x, i) => handleChange("month", i + 1)}
      />
      <IntegerInput
        maxLength={4}
        placeholder={t("common:fields.dob.year")}
        disabled={disabled}
        value={value?.year === 0 ? undefined : value?.year}
        onChange={(x) => handleChange("year", x)}
      />
      {error && (
        <Span
          className="error-text"
          fontSize={12}
        >
          {error}
        </Span>
      )}
    </Div>
  );
};
