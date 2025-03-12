import { useState, FC } from "react";
import { useInterval } from "usehooks-ts";
import classNames from "classnames";
import { Dates } from "@core/services/dates";
import { SpanProps, Span } from "../span/Span";

export type TimestampFormat = "weekday" | "full" | "timer" | "elapsed";

export type TimestampProps = Omit<SpanProps, "children"> & {
  date: Date;
  format: TimestampFormat;
};

export const Timestamp: FC<TimestampProps> = ({
  className,
  date,
  format,
  ...forwardProps
}) => {
  const getString = (date: Date, format: TimestampFormat) => {
    switch (format) {
      case "weekday":
        return Dates.toWeekdayString(date);
      case "full":
        return Dates.toFullDateString(date);
      case "timer":
        return Dates.toTimerString(date);
      case "elapsed":
        return Dates.toElapsedString(date, false);
    }
  };

  const [text, setText] = useState(getString(date, format));

  useInterval(() => {
    if (format === "timer" || format === "elapsed") {
      setText(getString(date, format));
    }
  }, 1000);

  return (
    <Span
      className={classNames("Timestamp", className)}
      {...forwardProps}
    >
      {text}
    </Span>
  );
};
