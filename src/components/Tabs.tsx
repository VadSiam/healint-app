import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { DAILY, MONTHLY, YEARLY } from './constants';
import { MainContext } from '../pages/context';

const TabsComponent = () => {
  const {tab, setTab} = React.useContext(MainContext);
  const handleChange = React.useCallback((_: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  }, []);

  return (
    <Paper square>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        centered
      >
        <Tab label={DAILY} />
        <Tab label={MONTHLY} />
        <Tab label={YEARLY} />
      </Tabs>
    </Paper>
  );
}

export default TabsComponent;