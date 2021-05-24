import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Typography from '@material-ui/core/Typography';
import { MainContext } from '../pages/context';
import { TITLE_ARRAY } from './constants';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
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

interface ICustom { 
  cx: number;
  cy: number;
  midAngle: number
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const  Chart = () => {
  const { tab } = React.useContext(MainContext);
  const title = React.useMemo(() => TITLE_ARRAY[tab], []);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={600} height={600}>
          <Pie 
            data={data01} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            fill="#8884d8" 
            label={renderCustomizedLabel}
            >
              {data01.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
          </Pie>
          <Pie 
            data={data02} 
            dataKey="value" 
            cx="50%" 
            cy="50%" 
            innerRadius={90} 
            outerRadius={110} 
            fill="#82ca9d" 
            label 
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;