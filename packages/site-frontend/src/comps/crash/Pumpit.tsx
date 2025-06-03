import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";

import React, { useEffect, useState } from "react";
import './Pumpit.scss';

// Memoizing the component to prevent unnecessary re-renders
// This will ensure that the component only re-renders when the `roundId` prop changes
const Pumpit = ({roundId}: {
  roundId: string;
}) => {

  const [hide, setHide] = useState(false);
  const playSound = useSoundPlayer("pumpit");
      
  useEffect(() => {
    playSound("pumpit");
    const timer = setTimeout(() => {
      setHide(true);
    }, 1000); // Hide after 1 second
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [roundId]);

  if(hide)
    return null;

  return (<Div fx fy center position="absolute" style={{ bottom: '-25px', height:"calc(100% + 50px)"}} left={0} zIndex={12}>
        <Img className="Pumpit" type="png" left={56} top={36} position="absolute" path="/graphics/games/crash/pumpit" width={"110px"} />
  </Div>);
};

export const PumpitMemoized = React.memo(Pumpit, (prevProps, nextProps) => {
  // Only re-render if the roundId changes
  return prevProps.roundId === nextProps.roundId;
});
