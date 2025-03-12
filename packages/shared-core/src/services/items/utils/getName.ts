type ItemLike = {
  baseName: string;
  styleName: string;
  symbol: string | null | undefined;
};

export function getName(item: ItemLike) {
  let name = `${item.baseName} | ${item.styleName}`;

  if (item.symbol) {
    name += ` (${item.symbol})`;
  }

  return name;
}
