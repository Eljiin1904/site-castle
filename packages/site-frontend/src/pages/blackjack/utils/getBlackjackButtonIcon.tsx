import { SvgBlackjackClear } from "#client/svgs/common/SvgBlackjackClear";
import { SvgBlackjackDouble } from "#client/svgs/common/SvgBlackjackDouble";
import { SvgBlackjackDouble2 } from "#client/svgs/common/SvgBlackjackDouble2";
import { SvgBlackjackHit } from "#client/svgs/common/SvgBlackjackHit";
import { SvgBlackjackRepeat } from "#client/svgs/common/SvgBlackjackRepeat";
import { SvgBlackjackSplit } from "#client/svgs/common/SvgBlackjackSplit";
import { SvgBlackjackStand } from "#client/svgs/common/SvgBlackjackStand";
import { SvgBlackjackUndo } from "#client/svgs/common/SvgBlackjackUndo";

const hash = {
  clear: {
    width: 18,
    height: 18,
    as: SvgBlackjackClear,
  },
  undo: {
    width: 14.39,
    height: 18,
    as: SvgBlackjackUndo,
  },
  repeat: {
    width: 19.8,
    height: 18,
    as: SvgBlackjackRepeat,
  },
  double2: {
    width: 18,
    height: 18,
    as: SvgBlackjackDouble2,
  },
  hit: {
    width: 15.3,
    height: 18,
    as: SvgBlackjackHit,
  },
  stand: {
    width: 17.05,
    height: 18,
    as: SvgBlackjackStand,
  },
  double: {
    width: 18.77,
    height: 18,
    as: SvgBlackjackDouble,
  },
  split: {
    width: 17.05,
    height: 18,
    as: SvgBlackjackSplit,
  },
};

export function getBlackjackButtonIcon(key: keyof typeof hash) {
  return hash[key];
}
