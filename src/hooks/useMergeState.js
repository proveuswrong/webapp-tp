import { useState } from "react";

export function useMergeState(initialState) {
  const [state, setState] = useState(initialState);

  const setMergedState = newState =>
    setState(prevState => ({
      ...prevState,
      ...newState
    }));

  return [state, setMergedState];
}