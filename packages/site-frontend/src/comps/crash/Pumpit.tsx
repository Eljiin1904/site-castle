import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { Video } from "@client/comps/video/Video";
import React, { useEffect, useState } from "react";

// Memoizing the component to prevent unnecessary re-renders
// This will ensure that the component only re-renders when the `roundId` prop changes
const Pumpit = ({roundId}: {
  roundId: string;
}) => {

  const [hide, setHide] = useState(false);
      
  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 4000); // Hide after 2 seconds
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [roundId]);

  console.log("Pumpit component rendered",hide);
  if(hide)
    return null;

  return (<Div fx fy center position="absolute" style={{ bottom: '-25px', height:"calc(100% + 50px)"}} left={0} zIndex={1}>
      <Video
          type="mp4"
          path="/videos/pumpit"
          autoplay={true}
          reset={false}
          muted={false}
          width="100%"
          alt="Pumpit video"
          controls={false}
          playBackSpeed={1}
          position="absolute"
          bottom={0}
          height="100%"
          style={{opacity: '0.5'}}
        />
        <Heading as="h3" color="white" position="absolute" right={40} style={{bottom: '42px'}} textTransform="uppercase" textAlign="center" fontSize={48} zIndex={2}>
          Pump it
        </Heading>
  </Div>);
};

export const PumpitMemoized = React.memo(Pumpit, (prevProps, nextProps) => {
  // Only re-render if the roundId changes
  return prevProps.roundId === nextProps.roundId;
});
