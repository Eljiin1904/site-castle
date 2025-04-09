import { Circle } from "@client/comps/circle/Circle";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import "./LimboStatus.scss";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const LimboStatus = () => {
  const { t } = useTranslation(["common"]);
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const limboEnabled = useAppSelector((x) => x.site.settings.limboEnabled);
  const sm = mainLayout === "mobile";

  return (
    <Div
      className={"LimboStatus"}
      align="center"
      justify="center"
      px={6}
      style={{
        width: sm ? 125 : 150,
      }}
    >
      <Circle
        as="div"
        width={8}
        height={8}
        color="white"
        alignItems="center"
        justifyContent="center"
        bg={limboEnabled ? "bright-green" : "bright-red"}
        mr={5}
      />
      <Span
        color="white"
        fontSize={sm ? 10 : 12}
      >
        {limboEnabled ? t("common:online") : t("common:offline")}
      </Span>
    </Div>
  );
};
