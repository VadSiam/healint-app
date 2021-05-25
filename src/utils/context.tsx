import React from 'react';
import { FAKE_YEAR_DATA, IData } from './sample-data';

interface IContextProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>
  mainData: IData[]
  removeElement: (args: {date: string, id: string}) => void
}

const MainContext = React.createContext({} as IContextProps);

const MainProvider: React.FC = ({ children }) => {
  const [tab, setTab] = React.useState<number>(0);
  const [mainData, setMainData] = React.useState<IData[]>(FAKE_YEAR_DATA);

  const removeElement = React.useCallback(({
    date,
    id,
  }: {date: string, id: string}) => {
    setMainData(mainDataState => {
      return (
        mainDataState.map(data => {
          if (data.date === date) {
            return {
              ...data,
              expense: data.expense.filter(exp => !(exp.id === id)),
            }
          }
          return data;
        })
      )
    });
  }, [])

  return (
    <MainContext.Provider
      value={{
        tab,
        setTab,
        mainData,
        removeElement,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
