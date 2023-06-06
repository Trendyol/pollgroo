import React, { createContext, useContext, useMemo, ReactNode, useState } from 'react';

interface ToasterContent {
  show: boolean,
  variant: string,
  text: string
}

type AppContextValuesType = {
  toasterContent: ToasterContent | undefined;
  showLoader: boolean;
  setShowLoader: (value: boolean) => void;
  setToasterContent: (content: ToasterContent | undefined) => void;
};

const AppContext = createContext({} as AppContextValuesType);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [toasterContent, setToasterContent] = useState<ToasterContent | undefined>({
    show: false,
    variant: "success",
    text: ""
  });

  const values = useMemo(
    () => ({
      toasterContent,
      showLoader,
      setShowLoader,
      setToasterContent,
    }),
    [toasterContent, showLoader, setShowLoader, setToasterContent]
  );
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
