import { useState, useEffect } from 'react';
import { isNewDay } from './checkNewDay';

function usePageStateWithNewDayCheck<T>(pageKey: string, initialState: T) {
  const [state, setState] = useState(() => {
    const storedState = localStorage.getItem(`${pageKey}Checkboxes`);
    return storedState ? JSON.parse(storedState) : initialState;
  });

  useEffect(() => {
    if (isNewDay(pageKey)) {
      setState(initialState);
      localStorage.setItem(`${pageKey}Checkboxes`, JSON.stringify(initialState));
    }
  }, [pageKey, initialState]);

  return [state, setState];
}

export default usePageStateWithNewDayCheck;
