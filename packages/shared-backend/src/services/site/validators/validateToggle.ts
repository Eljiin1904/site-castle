import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { HandledError } from "@server/services/errors";
import { Site } from "@server/services/site";

export async function validateToggle(key: keyof SiteSettingObject) {
  const settings = await Site.settings.cache();
  if (!settings[key]) {
    throw new HandledError(
      `This feature is currently disabled. Please try again later.`,
    );
  }
}
