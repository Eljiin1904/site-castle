import type {
  SiteMetaId,
  SiteMetaObject,
  SiteMetaValue,
} from "../site/SiteMetaDocument";
import type {
  SiteSettingId,
  SiteSettingObject,
  SiteSettingValue,
} from "../site/SiteSettingDocument";

export interface AdminServerEvents {
  "site-meta-init": (obj: SiteMetaObject) => void;
  "site-meta-update": (key: SiteMetaId, value: SiteMetaValue) => void;
  "site-settings-init": (obj: SiteSettingObject) => void;
  "site-settings-update": (key: SiteSettingId, value: SiteSettingValue) => void;
}
