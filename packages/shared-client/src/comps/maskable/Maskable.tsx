import { FC } from "react";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";

export type MaskableProps = {
  className?: string;
  height: string | number;
  children: any;
};

export const Maskable: FC<MaskableProps> = ({
  className,
  children,
  height,
}) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={classNames("Maskable", className)}
      style={{ height }}
    >
      {inView && children}
    </div>
  );
};
