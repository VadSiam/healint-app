export enum category {
  food = "food",
  transport = "transport",
  sport = "sport",
  utilities = "utilities",
  entertainment = "entertainment",
}

export interface IExpense {
  id: string
  name: string
  category: category
  value: number
}
export interface IData {
  id: string
  date: string
  expense: IExpense[]
}

export const FAKE_YEAR_DATA: IData[] = [
  {
    id: 'rerer22',
    date: '2021-05-02',
    expense: [
      { id: 'bb1', name: 'coffee', category: category.food, value: 2.5 },
      { id: 'aarere1', name: 'breakfast', category: category.food, value: 5 },
      { id: 'aa14343', name: 'supermarket food', category: category.food, value: 50 },
      { id: 'aa1fcdcd', name: 'fitness', category: category.sport, value: 100 },
    ]
  },
  {
    id: 'rerer',
    date: '2021-05-01',
    expense: [
      { id: 'aa1', name: 'coffee', category: category.food, value: 2.5 },
      { id: 'aa12', name: 'breakfast', category: category.food, value: 5 },
      { id: 'aasd1', name: 'metro', category: category.transport, value: 150 },
      { id: 'aaqwq1', name: 'cinema', category: category.entertainment, value: 10 },
    ]
  },
  {
    id: 'rereras33',
    date: '2021-05-03',
    expense: [
      { id: 'aazzz1', name: 'coffee', category: category.food, value: 4.5 },
      { id: 'aqwea1', name: 'breakfast', category: category.food, value: 5 },
      { id: 'ggg331', name: 'house rent', category: category.utilities, value: 1000 },
    ]
  },
  {
    id: 'rerer22ww',
    date: '2021-05-04',
    expense: [
      { id: 'bb31', name: 'coffee', category: category.food, value: 23.5 },
      { id: 'aadsdrere1', name: 'breakfast', category: category.food, value: 50 },
      { id: 'adsdasd1', name: 'metro', category: category.transport, value: 150 },
      { id: 'aa1dsd4343', name: 'supermarket food', category: category.food, value: 500 },
      { id: 'ggg3dsd31', name: 'electro', category: category.utilities, value: 100 },
      { id: 'aa1ddfcdcd', name: 'fitness', category: category.sport, value: 130 },
      { id: 'aaqffwq1', name: 'cinema', category: category.entertainment, value: 20 },
    ]
  },
] 
