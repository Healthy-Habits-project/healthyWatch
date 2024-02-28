export const initializeState = <T>(
  localStorageKey: string,
  initialState: T,
  uniqueId: string // Unique identifier for each page
): T => {
  const today: string = new Date().toDateString();
  const lastVisitDateKey = `${localStorageKey}-${uniqueId}-lastVisitDate`; // Unique key for each page
  const lastVisitDate: string | null = localStorage.getItem(lastVisitDateKey);

  if (today !== lastVisitDate) {
    localStorage.setItem(lastVisitDateKey, today);
    localStorage.setItem(localStorageKey, JSON.stringify(initialState)); // Optionally reset state
    return initialState;
  } else {
    const storedState = localStorage.getItem(localStorageKey);
    return storedState ? JSON.parse(storedState) : initialState;
  }
};
export default initializeState
