import { SvgTimesCirlce } from "#client/svgs/common/SvgTimesCircle";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Button } from "../button/Button";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Vector } from "../vector/Vector";

export const FormErrorBox = ({
  error,
  onAck,
}: {
  error: string;
  onAck: () => void;
}) => {
  
  const {t} = useTranslation(["validations"]);
  return (
    <Div
      className="error-box"
      position="absolute"
      top={0}
      fx
      fy
      column
      center
      gap={16}
    >
      <Div
        fx
        grow
        center
        column
        gap={8}
        bg="brown-8"
        border
        borderColor="red"
      >
        <Vector
          as={SvgTimesCirlce}
          size={24}
          color="light-red"
        />
        <Span
        color="light-sand"
        >{t(error)}</Span>
      </Div>
      <Button
        kind="primary"
        fx
        label={t("common:okay")}
        onClick={onAck}
      />
    </Div>
  );
};
