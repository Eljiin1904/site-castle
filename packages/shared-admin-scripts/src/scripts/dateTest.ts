import { addDays, differenceInDays, isAfter, subHours } from "date-fns";

export async function dateTest() {
  handleAdvent();
}

function handleAdvent() {
  console.log(getDay());
  console.log("--------");
}

function getDay() {
  const now = subHours(addDays(Date.now(), 7), 14);
  const resetDate = new Date("2024-12-01T18:00:00.000+00:00");

  if (isAfter(resetDate, now)) {
    return 0;
  }

  const daysSinceStart = differenceInDays(now, resetDate);

  console.log("--------");
  console.log(resetDate.toLocaleString());
  console.log("--------");
  console.log(now.toLocaleString());
  console.log("--------");

  return daysSinceStart + 1;
}

function getNextDate() {
  const now = subHours(addDays(Date.now(), 14), 14);
  const resetDate = new Date("2024-12-01T18:00:00.000+00:00");

  if (isAfter(resetDate, now)) {
    return resetDate;
  }

  const daysSinceStart = differenceInDays(now, resetDate);
  const next = addDays(resetDate, 1 + daysSinceStart);

  console.log("--------");
  console.log(resetDate.toLocaleString());
  console.log("--------");
  console.log(now.toLocaleString());
  console.log("--------");

  return next;
}
