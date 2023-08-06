// utils/useMediaQuery.js
import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const mediaQuery = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQuery.matches);

  useEffect(() => {
    const handleResize = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [mediaQuery]);

  return matches;
}
