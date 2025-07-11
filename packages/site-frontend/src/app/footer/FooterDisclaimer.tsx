import { Circle } from "@client/comps/circle/Circle";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const FooterDisclaimer = ({mt = 32} : {mt?: Unit}) => {
  const { t } = useTranslation();
  return (
    <Span size={12}>
      {
        `Castle ${t('footer.disclaimer')}`
      }
      <Div
        gap={24}
        mt={mt}
        justify="flex-start"
      >
        <Circle
          as="div"
          width={64}
          height={64}
          color="white"
          alignItems="center"
          justifyContent="center"
          bg="brown-4"
        >
          <Div
            color="white"
            width={40}
            fontSize={12}
            height={80}
            alignItems="center"
            justifyContent="center"
            column
          >
             {t('footer.gamble')}
            <Span
              color="white"
              fontSize={12}
              lineHeight={12}
            >
              {t('footer.aware')}
            </Span>
          </Div>
        </Circle>

        <Circle
          as="div"
          width={64}
          height={64}
          color="white"
          align="center"
          justify="center"
          bg="brown-4"
        >
          <Div
            color="white"
            width={40}
            fontSize={20}
            height={80}
            alignItems="center"
            justifyContent="center"
            column
          >
            {t('footer.18+')}
          </Div>
        </Circle>

        <Circle
          as="div"
          width={64}
          height={64}
          color="white"
          align="center"
          justify="center"
          bg="brown-4"
        >
          <Div
            color="white"
            width={40}
            fontSize={16}
            height={80}
            alignItems="center"
            justifyContent="center"
            column
          >
            {t('footer.rng')}
            <Span
              color="white"
              fontSize={10}
              lineHeight={12}
            >
               {t('footer.certified')}
            </Span>
          </Div>
        </Circle>
      </Div>
    </Span>
  );
};
