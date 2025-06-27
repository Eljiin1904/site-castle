import { SvgNetworkFair, SvgNetworkGood, SvgNetworkPoor, SvgNetworkVeryGood, SvgNetworkVeryPoor } from "#app/svgs/common/SvgNetwork";
import { networkThreshold } from "../Site";

export function getNetworkIcon(latency: number) : Svg {
  if (latency > networkThreshold.veryPoor) {
    return SvgNetworkVeryPoor
  } else if (latency > networkThreshold.poor) {
    return SvgNetworkPoor;
  }
   else if (latency > networkThreshold.fair) {
    return SvgNetworkFair;
  } else if (latency > networkThreshold.good) {
    return SvgNetworkGood
  }
  return  SvgNetworkVeryGood;
};