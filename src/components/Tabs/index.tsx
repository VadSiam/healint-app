import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { DAILY, MONTHLY, YEARLY } from '../../utils/constants';
import { MainContext } from '../../utils/context';

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
        <Tab 
          disabled
          label={YEARLY} 
        />
      </Tabs>
    </Paper>
  );
}

export default TabsComponent;