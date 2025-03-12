export function popup(options: {
  url: string;
  target?: string;
  w: number;
  h: number;
}) {
  const { url, target, w, h } = options;
  const y = window.outerHeight / 2 + window.screenY - h / 2;
  const x = window.outerWidth / 2 + window.screenX - w / 2;
  return window.open(
    url,
    target,
    `popup,noreferrer,width=${w},height=${h},left=${x},top=${y}`,
  );
}
