export function getBreakpointValue(breakpointName) {
  const breakpoints = {
    small: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--small"), 10),
    large: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--large"), 10),
  };

  return breakpoints[breakpointName] || null;
}
