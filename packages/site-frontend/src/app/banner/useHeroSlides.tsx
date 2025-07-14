import { useMemo } from "react";
import { HeroBannerSlideProps } from "./HeroBannerSlide";
import { useTranslation } from "@core/services/internationalization/internationalization";

export function useHeroSlides() {
  const { t, i18n } = useTranslation(["pages/home"]);
  const lang = i18n.language;
  const slides: HeroBannerSlideProps[] = useMemo(
    () => [
      {
        type: "router",
        to: "/limbo",
        image: "/heroes/hero-banner",
        heading: t("banners.1.heading"),
        description: t("banners.1.description"),
        button: t("banners.1.button"),
      },
      {
        type: "router",
        to: "/crash",
        image: "/heroes/shitcoin-crash-banner",
        heading: t("banners.2.heading"),
        description: t("banners.2.description"),
        button: t("banners.2.button"),
      },
    ],
    [lang],
  );

  return slides;
}
