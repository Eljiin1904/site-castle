export type ConditionalProps<TValue extends string> = {
  value: TValue;
} & Partial<{ [key in TValue]: JSX.Element | null }>;

export function Conditional<TValue extends string>(
  props: ConditionalProps<TValue>,
) {
  return props[props.value] || null;
}
