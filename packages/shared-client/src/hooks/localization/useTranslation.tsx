import { Localization } from "@core/services/localization";
import { TranslationLocale } from "@core/types/localization/TranslationLocale";
import { useEffect, useState } from "react";

export function useTranslation(locale: TranslationLocale) {
  const [map, setMap] = useState(Localization.translationMaps[locale]);

  useEffect(() => {
    setMap(Localization.translationMaps[locale]);
  }, [locale]);

  return map;
}
