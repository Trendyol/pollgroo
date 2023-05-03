import React, { createContext, useContext, useMemo, ReactNode } from 'react';

type AppContextValuesType = {};

const AppContext = createContext({} as AppContextValuesType);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const values = useMemo(() => ({}), []);
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
