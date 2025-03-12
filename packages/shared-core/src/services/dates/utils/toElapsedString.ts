export function toElapsedString(date: Date | undefined, showSeconds: boolean) {
  if (!date) {
    return "Never";
  }

  date = new Date(date);

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  let interval;

  interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  } else if (interval === 1) {
    return "1 year ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  } else if (interval === 1) {
    return "1 month ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  } else if (interval === 1) {
    return "1 day ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  } else if (interval === 1) {
    return "1 hour ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  } else if (interval === 1) {
    return "1 minute ago";
  }

  if (showSeconds && seconds > 1) {
    return Math.floor(seconds) + " seconds ago";
  }

  return "just now";
}
