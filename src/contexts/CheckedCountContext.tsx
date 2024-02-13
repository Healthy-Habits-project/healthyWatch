import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CheckedCountContextType {
  checkedCount: number;
  setCheckedCount: (count: number) => void;
}

const CheckedCountContext = createContext<CheckedCountContextType>({
  checkedCount: 0,
  setCheckedCount: () => {}
});

interface CheckedCountProviderProps {
  children: ReactNode; // Type for children
}

export const CheckedCountProvider: React.FC<CheckedCountProviderProps> = ({ children }) => {
  const [checkedCount, setCheckedCount] = useState(0);

  return (
    <CheckedCountContext.Provider value={{ checkedCount, setCheckedCount }}>
      {children}
    </CheckedCountContext.Provider>
  );
};

export const useCheckedCount = () => useContext(CheckedCountContext);


