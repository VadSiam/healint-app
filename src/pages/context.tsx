import React from 'react';

interface IContextProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>
}

const MainContext = React.createContext({} as IContextProps);

const MainProvider: React.FC = ({ children }) => {
  const [tab, setTab] = React.useState<number>(0);

  return (
    <MainContext.Provider
      value={{
        tab,
        setTab,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
