import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Typography from '@material-ui/core/Typography';
import { MainContext } from '../../utils/context';
import { TITLE_ARRAY } from '../../utils/constants';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { IExpense } from '../../utils/sample-data';



interface ICustom { 
  cx: number;
  cy: number;
  midAngle: number
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}
interface ICustomOuter extends ICustom {
  name: string;
  value: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: ICustom) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const renderCustomizedLabelOuter = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }: ICustomOuter) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 2 ;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      fill="black" 
      x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central"
    >
      {`${name} - ${value}`}
    </text>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFC0CB'];

const  Chart = () => {
  const { tab, mainData } = React.useContext(MainContext);
  const title = React.useMemo(() => TITLE_ARRAY[tab], []);
  const [currentDate, setCurrentDate] = React.useState<string>('');
  const [currentMonth, setCurrentMonth] = React.useState<string>('');

  const dailyDataOptions = React.useMemo(() => {
    return mainData.map((data) => ({
      label: data.date,
      value: data.date,
    }))
  }, [mainData]);

  const montlyDataOptions = React.useMemo(() => {
    const parsedByMonth = mainData?.reduce((acc, item) => {
      const getingMonth = item.date.split('-')?.[1];
      const isMonthExist = acc.find(c => c?.date === getingMonth);
      if (isMonthExist) {
        return acc.map(existItem => {
          if (existItem.date === getingMonth) {
            return ({
              ...existItem,
              expense: [
                ...existItem.expense,
                ...item.expense,
              ],
            })
          }
          return existItem;
        })
      }
      return [
        ...acc, 
        {
          date: getingMonth, 
          name: getingMonth, 
          expense: item.expense,
        }
      ]
    }, [{ date: '', expense: [{} as IExpense] }])

    return parsedByMonth.map((data) => ({
      label: data.date,
      value: data.date,
      fullItem: data
    }))
  }, [mainData]);

  React.useEffect(() => {
    if (!!dailyDataOptions.length) {
      const lastElement = dailyDataOptions[dailyDataOptions.length - 1];
      setCurrentDate(lastElement.value);
    }
    if (!!montlyDataOptions.length) {
      const lastElement = montlyDataOptions[montlyDataOptions.length - 1];
      setCurrentMonth(lastElement.value);
    }
  }, [dailyDataOptions, montlyDataOptions])

  const handleChangeDate = React.useCallback((date) => {
    setCurrentDate(date.target.value);
  }, [])

  const handleChangeMonth = React.useCallback((date) => {
    setCurrentMonth(date.target.value);
  }, [])

  const chartsData = React.useMemo(() => {
    const currentDateData = mainData.find(d => d.date === currentDate);
    const outerChart = currentDateData?.expense;
    const innerChart = currentDateData?.expense.reduce((acc, item) => {
      const isCategoryExist = acc.find(c => c?.name === item.category);
      if (isCategoryExist) {
        return acc.map(existItem => {
          if (existItem.name === item.category) {
            return ({
              ...existItem,
              value: (existItem.value + item.value),
            })
          }
          return existItem;
        })
      }
      return [
        ...acc, 
        {
          name: item.category, value: item.value,
        }
      ]
    }, [{ name: '', value: 0 }])?.filter(chrt => chrt.value)
    return ({ 
      outerChart, 
      innerChart,
    });
  }, [currentDate, mainData])

  const chartsDataMonth = React.useMemo(() => {
    const currentMonthData = montlyDataOptions.find(d => d.value === currentMonth);
    const outerChart = currentMonthData?.fullItem?.expense;
    const innerChart = currentMonthData?.fullItem?.expense.reduce((acc, item) => {
      const isCategoryExist = acc.find(c => c?.name === item.category);
      if (isCategoryExist) {
        return acc.map(existItem => {
          if (existItem.name === item.category) {
            return ({
              ...existItem,
              value: (existItem.value + item.value),
            })
          }
          return existItem;
        })
      }
      return [
        ...acc, 
        {
          name: item.category, value: item.value,
        }
      ]
    }, [{ name: '', value: 0 }])?.filter(chrt => chrt.value)
    return ({ 
      outerChart: outerChart?.sort((chrtA, chrtB) => chrtA.category.toString().localeCompare(chrtB.category.toString())),
      innerChart: innerChart?.sort((chrtA, chrtB) => chrtA.name.localeCompare(chrtB.name)),
    });
  }, [currentMonth, montlyDataOptions])

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
        <Divider />
        {(tab === 0) 
          ? <TextField
              id="standard-select-date"
              select
              label="Date"
              value={currentDate}
              onChange={handleChangeDate}
              helperText="Please select your Date"
            >
              {dailyDataOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          : <TextField
              id="standard-select-month"
              select
              label="Month"
              value={currentMonth}
              onChange={handleChangeMonth}
              helperText="Please select your Month"
            >
              {montlyDataOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
      }
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={800} height={800}>
          <Pie 
            data={(tab === 0) ? chartsData?.innerChart : chartsDataMonth.innerChart} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            fill="#8884d8" 
            label={renderCustomizedLabel}
            >
              {(((tab === 0) ? chartsData?.innerChart : chartsDataMonth?.innerChart) ?? []).map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
          </Pie>
          <Pie 
            data={(tab === 0) ? chartsData?.outerChart : chartsDataMonth.outerChart} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            innerRadius={90} 
            outerRadius={110} 
            fill="#82ca9d" 
            label={renderCustomizedLabelOuter}
          >
            {(((tab === 0) ? chartsData?.outerChart : chartsDataMonth?.outerChart) ?? []).map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;