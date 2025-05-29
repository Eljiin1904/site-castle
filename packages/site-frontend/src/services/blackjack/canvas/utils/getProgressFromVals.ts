// have to do the parital thing again unfortunately
type Vals = Partial<Record<string, number>>;

export function getProgressFromVals<T extends Vals>(start: T, end: T, cur: T) {
  // start x: 20
  // end x: 100
  // cur x: 40
  // progress: 20 / 80 = 0.25
  const progressAr: number[] = [];

  for (let k in start) {
    if (start[k] === undefined || end[k] === undefined || cur[k] === undefined) {
      throw new Error("start, end, or cur value is undefined");
    }

    const diff = end[k] - start[k];
    const progress = (cur[k] - start[k]) / diff;
    progressAr.push(progress);
  }

  // should be the same, averaging anyway
  const progress = progressAr.reduce((a, b) => a + b, 0) / progressAr.length;
  return progress;
}
