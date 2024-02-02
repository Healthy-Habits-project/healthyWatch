import React, { createContext, useContext, useState } from 'react';

interface AppContextProps {
  selectedOption: number | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<number | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
