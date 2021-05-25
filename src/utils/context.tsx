import React from 'react';
import { generateId } from './helpers';
import { category, FAKE_YEAR_DATA, IData } from './sample-data';

interface ICreate {
  date: string,
  expense: {
    name: string,
    category: category,
    value: number,
  }
}
interface IEdit {
  date: string,
  expense: {
    id: string,
    name: string,
    category: category,
    value: number,
  }
}

interface IModal {
  id: string, 
  date: string, 
  open: boolean
}
interface IContextProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>
  mainData: IData[]
  removeElement: (args: {date: string, id: string}) => void
  createElement: (args: ICreate) => void
  editElement: (args: IEdit) => void
  openModalId: IModal
  setOpenModalId: React.Dispatch<React.SetStateAction<IModal>>
}

const MainContext = React.createContext({} as IContextProps);

const MainProvider: React.FC = ({ children }) => {
  const [tab, setTab] = React.useState<number>(0);
  const [mainData, setMainData] = React.useState<IData[]>(FAKE_YEAR_DATA);
  const [openModalId, setOpenModalId] = React.useState<IModal>({
    id: '',
    date: '',
    open: false,
  });

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

  const editElement = React.useCallback(({
    date,
    expense,
  }: IEdit) => {
    setMainData(mainDataState => {
      return mainDataState.map(data => {
        if (data.date === date) {
          return {
            ...data,
            expense: data.expense.map(expData => {
              if (expData.id === expense.id) {
                return expense;
              }
              return expData;
            }),
          }
        }
        return data;
      })
    })
  }, [])

  const createElement = React.useCallback(({
    date,
    expense,
  }: ICreate) => {
    setMainData(mainDataState => {
      const isDateExist = mainDataState.some(md => md.date === date)
      if (isDateExist) {
        return mainDataState.map(data => {
          if (data.date === date) {
            return {
              ...data,
              expense: [
                ...data.expense, 
                {
                  ...expense,
                  id: generateId(),
                }
              ],
            }
          }
          return data;
        })
      }
      return [
        ...mainDataState,
        {
          id: generateId(),
          date,
          expense: [{
            ...expense,
            id: generateId(),
          }]
        }
      ]
    })
  }, [])

  return (
    <MainContext.Provider
      value={{
        tab,
        setTab,
        mainData: mainData.sort((dA, dB) => dA.date.localeCompare(dB.date)),
        removeElement,
        createElement,
        editElement,
        openModalId, 
        setOpenModalId,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
