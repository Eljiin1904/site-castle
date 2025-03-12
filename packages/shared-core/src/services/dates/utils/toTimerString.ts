export function toTimerString(endDate: Date) {
  endDate = new Date(endDate);

  if (endDate.getTime() < Date.now()) {
    return "00:00";
  }

  let secondsLeft = Math.floor((endDate.getTime() - Date.now()) / 1000);

  const days = Math.floor(secondsLeft / 86400);
  secondsLeft -= days * 86400;

  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft -= hours * 3600;

  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft -= minutes * 60;

  const seconds = secondsLeft;

  if (days > 0) {
    return `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
}
