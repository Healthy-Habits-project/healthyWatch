import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CheckboxState {
  mindfulness: boolean;
  // Define other checkbox states as needed
}

const initialCheckboxState: CheckboxState = {
  mindfulness: false, // Assume checkboxes are unchecked initially
  
};

interface CheckboxContextType {
  state: CheckboxState;
  setState: React.Dispatch<React.SetStateAction<CheckboxState>>;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

// Define the props for CheckboxProvider including children
interface CheckboxProviderProps {
  children: ReactNode;
}

export const CheckboxProvider: React.FC<CheckboxProviderProps> = ({ children }) => {
  const [state, setState] = useState<CheckboxState>(initialCheckboxState);

  return (
    <CheckboxContext.Provider value={{ state, setState }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (context === undefined) {
    throw new Error('useCheckboxContext must be used within a CheckboxProvider');
  }
  return context;
};