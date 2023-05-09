import React, { createContext, useContext, useMemo, ReactNode, useState } from 'react';

type AppContextValuesType = {
  showLoader: boolean;
  setShowLoader: (value: boolean) => void;
};

const AppContext = createContext({} as AppContextValuesType);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const values = useMemo(
    () => ({
      showLoader,
      setShowLoader,
    }),
    [showLoader, setShowLoader]
  );
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
