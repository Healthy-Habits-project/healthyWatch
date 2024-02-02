import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  selectedOption: number | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<number | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };