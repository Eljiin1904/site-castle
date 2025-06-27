import { SVGProps } from "react";

export const SvgNetworkVeryGood = (props: SVGProps<SVGSVGElement>) => {

  return ( <svg
    viewBox="0 0 16 20"
    {...props}
  >
    <NetworkBars bars={4} />
  </svg>);
}

export const SvgNetworkGood = (props: SVGProps<SVGSVGElement>) => {

  return ( <svg
    viewBox="0 0 16 20"
    {...props}
  >
    <NetworkBars bars={3} />
  </svg>);
}

export const SvgNetworkFair = (props: SVGProps<SVGSVGElement>) => {

  return ( <svg
    viewBox="0 0 16 20"
    {...props}
  >
    <NetworkBars bars={2} />
  </svg>);
}
export const SvgNetworkPoor = (props: SVGProps<SVGSVGElement>) => {

  return ( <svg
    viewBox="0 0 16 20"
    {...props}
  >
    <NetworkBars bars={1} />
  </svg>);
}
export const SvgNetworkVeryPoor = (props: SVGProps<SVGSVGElement>) => {

  return ( <svg
    viewBox="0 0 16 20"
    {...props}
  >
    <NetworkBars bars={0} />
    <line x1="8" y1="10" x2="16" y2="18" stroke="currentColor" strokeWidth="2" />
    <line x1="16" y1="10" x2="8" y2="18" stroke="currentColor" strokeWidth="2" />
  </svg>);
}

const NetworkBars = ({bars}:{bars:number}) => {
 
  return (
    <>
       <rect x="0" y="12" width="3" height="4" fill={bars > 0 ? 'currentColor': 'grey'} />
        <rect x="4" y="8" width="3" height="8" fill={bars > 1 ? 'currentColor': 'grey'} />
        <rect x="8" y="4" width="3" height="12" fill={bars > 2 ? 'currentColor': 'grey'} />
        <rect x="12" y="0" width="3" height="16" fill={bars > 3 ? 'currentColor': 'grey'} />
    </>
  );
};
export const SvgNetworkX = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 20" {...props}>
      <line x1="0" y1="0" x2="16" y2="20" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};