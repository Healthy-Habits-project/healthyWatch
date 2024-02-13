import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalCountsContextType {
  physicalHealthCheckedCount: number;
  setPhysicalHealthCheckedCount: (count: number) => void;
  mentalHealthCheckedCount: number;
  setMentalHealthCheckedCount: (count: number) => void;
  nutritionCheckedCount: number;
  setNutritionCheckedCount: (count: number) => void;
  sleepCheckedCount: number;
  setSleepCheckedCount: (count: number) => void;
}

const defaultValues: GlobalCountsContextType = {
  physicalHealthCheckedCount: 0,
  setPhysicalHealthCheckedCount: () => {},
  mentalHealthCheckedCount: 0,
  setMentalHealthCheckedCount: () => {},
  nutritionCheckedCount: 0,
  setNutritionCheckedCount: () => {},
  sleepCheckedCount: 0,
  setSleepCheckedCount: () => {},
};

const GlobalCountsContext = createContext<GlobalCountsContextType>(defaultValues);

export const GlobalCountsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [physicalHealthCheckedCount, setPhysicalHealthCheckedCount] = useState(0);
  const [mentalHealthCheckedCount, setMentalHealthCheckedCount] = useState(0);
  const [nutritionCheckedCount, setNutritionCheckedCount] = useState(0);
  const [sleepCheckedCount, setSleepCheckedCount] = useState(0);

  return (
    <GlobalCountsContext.Provider value={{
      physicalHealthCheckedCount, setPhysicalHealthCheckedCount,
      mentalHealthCheckedCount, setMentalHealthCheckedCount,
      nutritionCheckedCount, setNutritionCheckedCount,
      sleepCheckedCount, setSleepCheckedCount
    }}>
      {children}
    </GlobalCountsContext.Provider>
  );
};

export const useGlobalCounts = () => useContext(GlobalCountsContext);
