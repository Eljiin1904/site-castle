export function toElapsedString(date: Date | undefined, showSeconds: boolean) {
  if (!date) {
    return "Never";
  }

  date = new Date(date);

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  let interval;

  interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + "y ago";
  } else if (interval === 1) {
    return "1y ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  } else if (interval === 1) {
    return "1 month ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + "d ago";
  } else if (interval === 1) {
    return "1d ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + "h ago";
  } else if (interval === 1) {
    return "1h ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + "m ago";
  } else if (interval === 1) {
    return "1m ago";
  }

  if (showSeconds && seconds > 1) {
    return Math.floor(seconds) + "s ago";
  }

  return "just now";
}
