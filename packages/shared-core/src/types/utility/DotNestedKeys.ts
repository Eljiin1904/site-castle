type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

/* eslint-disable */

export type DotNestedKeys<T> = T extends Date | Function | Array<any>
  ? ""
  : (
        T extends object
          ? {
              [K in Exclude<
                keyof T,
                symbol
              >]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`;
            }[Exclude<keyof T, symbol>]
          : ""
      ) extends infer D
    ? Extract<D, string>
    : never;

/* eslint-enable */
