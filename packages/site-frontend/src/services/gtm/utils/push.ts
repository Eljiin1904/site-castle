import TagManager from "react-gtm-module";

export function push(dataLayer: object) {
  TagManager.dataLayer({ dataLayer });
}
