import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, Location } from "react-router-dom";

export function useLocationChange(callback: (location: Location<any>) => void) {
  const location = useLocation();
  const savedCallback = useRef(callback);
  const ref = useRef(location);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (ref.current !== location) {
      savedCallback.current(location);
    }
  }, [location]);
}
