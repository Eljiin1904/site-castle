import { FC, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@client/comps/input/Input";
import { SvgCheck } from "@client/svgs/common/SvgCheck";
import { Errors } from "@client/services/errors";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Spinner } from "@client/comps/spinner/Spinner";
import { SvgCancel } from "@client/svgs/common/SvgCancel";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export type UsernameFieldProps = {
  placeholder: string;
  value: string | undefined;
  disabled?: boolean;
  error?: string;
  setError: (x: string | undefined) => void;
  onChange: (value: string | undefined) => void;
};

export const UsernameField: FC<UsernameFieldProps> = ({
  placeholder,
  value,
  disabled,
  error,
  setError,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const debounced = useDebounceCallback(setCurrentValue, 500);
  const {t} = useTranslation();

  const query = useQuery({
    enabled: currentValue !== undefined,
    queryKey: [currentValue],
    queryFn: () => Users.checkUsername({ username: currentValue! }),
    placeholderData: (prev) => prev,
  });

  const queryError = query.error;
  const isValid = currentValue && query.data?.isAvailable;


  useEffect(() => {
    if (queryError) {
      setError(Errors.getMessage(queryError));
    } else {
      setError(undefined);
    }
  }, [queryError]);

  return (
    <Div align="center">
      <Input
        type="text"
        id="new-username"
        autoComplete="username"
        placeholder={placeholder}
        maxLength={Users.nameMaxLength}
        disabled={disabled}
        error={error}
        value={value}
        onChange={(x) => {
          const value = x?.replace(/[^a-z0-9]/gi, "");
          onChange(value);
          debounced(value);
        }}
      />
      <Div
        position="absolute"
        right={12}
      >
        {query.isFetching ? (
          <Spinner />
        ) : (
          <Vector
            as={isValid ? SvgCheck : SvgCancel}
            color={isValid ? "green" : currentValue ? "light-red" : "dark-sand"}
            hover="highlight"
            data-tooltip-id="app-tooltip"
            data-tooltip-content={
              isValid
                ? t("register.extraValidations.username.available")
                : currentValue
                  ? t("register.extraValidations.username.unavailable")
                  : t("register.extraValidations.username.required")
            }
          />
        )}
      </Div>
    </Div>
  );
};
