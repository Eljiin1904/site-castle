import { FC } from "react";

export type PredicatedProps = {
  component: JSX.Element;
  predicate: () => boolean;
};

export const Predicated: FC<PredicatedProps> = (props: PredicatedProps) => {
  if (props.predicate()) {
    return props.component;
  } else {
    return null;
  }
};
