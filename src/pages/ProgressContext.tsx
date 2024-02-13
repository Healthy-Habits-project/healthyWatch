import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DayRatings {
  [key: string]: number;
}

interface ProgressContextType {
  dayRatings: DayRatings;
  updateDayRating: (date: string, rating: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [dayRatings, setDayRatings] = useState<DayRatings>({});

  const updateDayRating = (date: string, rating: number) => {
    setDayRatings((prevRatings) => ({
      ...prevRatings,
      [date]: rating,
    }));
  };

  return (
    <ProgressContext.Provider value={{ dayRatings, updateDayRating }}>
      {children}
    </ProgressContext.Provider>
  );
};
