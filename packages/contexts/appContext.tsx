import React, { createContext, useContext, useMemo, ReactNode, useState } from 'react';

interface ToasterContent {
  show: boolean;
  variant: 'success' | 'error' | 'warning';
  text: string;
}

type AppContextValuesType = {
  toasterContent: ToasterContent | undefined;
  showLoader: boolean;
  setShowLoader: (value: boolean) => void;
  setToasterContent: (content: ToasterContent | undefined) => void;
  isReducedNavbar: boolean;
  setIsReducedNavbar: (value: boolean) => void;
};

const AppContext = createContext({} as AppContextValuesType);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isReducedNavbar, setIsReducedNavbar] = React.useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [toasterContent, setToasterContent] = useState<ToasterContent | undefined>({
    show: false,
    variant: 'success',
    text: '',
  });

  const values = useMemo(
    () => ({
      toasterContent,
      showLoader,
      setShowLoader,
      setToasterContent,
      setIsReducedNavbar,
      isReducedNavbar,
    }),
    [toasterContent, showLoader, setShowLoader, setToasterContent, isReducedNavbar, setIsReducedNavbar]
  );
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
