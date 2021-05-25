export enum category {
  food,
  transport,
  sport,
  utilities,
  entertainment,
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
    date: '02-05-2021',
    expense: [
      { id: 'bb1', name: 'coffee', category: category.food, value: 2.5 },
      { id: 'aarere1', name: 'breakfast', category: category.food, value: 5 },
      { id: 'aa14343', name: 'supermarket food', category: category.food, value: 50 },
      { id: 'aa1fcdcd', name: 'fitness', category: category.sport, value: 100 },
    ]
  },
  {
    id: 'rerer',
    date: '01-05-2021',
    expense: [
      { id: 'aa1', name: 'coffee', category: category.food, value: 2.5 },
      { id: 'aa12', name: 'breakfast', category: category.food, value: 5 },
      { id: 'aasd1', name: 'metro', category: category.transport, value: 150 },
      { id: 'aaqwq1', name: 'cinema', category: category.entertainment, value: 10 },
    ]
  },
  {
    id: 'rereras33',
    date: '03-05-2021',
    expense: [
      { id: 'aazzz1', name: 'coffee', category: category.food, value: 4.5 },
      { id: 'aqwea1', name: 'breakfast', category: category.food, value: 5 },
      { id: 'ggg331', name: 'house rent', category: category.utilities, value: 1000 },
    ]
  }
] 

export const data01 = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Sport', value: 300 },
  { name: 'Utilities', value: 200 },
  { name: 'Entertainment', value: 200 },
];
export const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
