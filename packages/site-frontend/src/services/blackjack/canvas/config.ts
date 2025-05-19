// === card sizes
const cardScale = 1.5;
export const CARD_DIMS = {
  width: 65 * cardScale,
  height: 90 * cardScale,
};
export const DECK_DIMS = {
  width: 65 * cardScale,
  height: 99 * cardScale,
};

// === starting locations
// switch to delta from canvas center
export const DECK_POINT = {
  x: 700,
  y: -CARD_DIMS.height / 2,
};

// === offset amounts for new cards
export const NEW_CARD_OFFSET = {
  x: 40,
  y: 30,
};
// if card stack gets too long
export const NEW_COL_OFFSET = {
  x: 120,
  y: 40,
};
export const X_NEW_COL_OFFSET = 80;

// === anim timing
export const DELAY_PER_CARD = 400;
export const CARD_MOVE_TIME = 200;
export const CARD_FLIP_DELAY = CARD_MOVE_TIME;
export const CARD_FLIP_TIME = 200;
// not in use?
export const INFO_DELAY_PER_CARD = DELAY_PER_CARD + CARD_MOVE_TIME + CARD_FLIP_TIME;

export const SPLIT_CARD_MOVE_TIME = 200;
