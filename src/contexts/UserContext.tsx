import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState('');

  const contextValue: UserContextType = {
    userName,
    setUserName,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
