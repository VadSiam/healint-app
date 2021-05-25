import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PlusOneOutlinedIcon from '@material-ui/icons/PlusOneOutlined';
import MoneyTwoTone from '@material-ui/icons/MoneyTwoTone';
import LayersIcon from '@material-ui/icons/Layers';
import Chart from '../components/Charts';
import Table from '../components/Table';
import TabsComponent from '../components/Tabs';
import { MainContext } from '../utils/context';
import { DAILY, MONTHLY, YEARLY } from '../utils/constants';
import FormModal from '../components/Table/Modal';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  textToRight: {
    marginLeft: 20,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 400,
  },
}));

const Home = () => {
  const { tab, setTab, setOpenModalId } = React.useContext(MainContext);
  console.log('🚀 ~ file: index.tsx ~ line 109 ~ Home ~ tab', tab);
  const handleChange = React.useCallback((newValue: number) => {
    setTab(newValue);
  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleDrawerClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  const fixedHeightPaper = React.useMemo(() => clsx(classes.paper, classes.fixedHeight), []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <FormModal />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            My Expense Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <Divider />
        <ListItem 
          onClick={() => setOpenModalId({
            id: '', 
            date: '',
            open: true
          })}
        >
          <ListItemAvatar>
            <Avatar className={classes.green}>
              <ShoppingCartIcon 
                color="action" 
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ADD NEW FACILITY" secondary="Right now" />
        </ListItem>
        <Divider />
        <Divider />
        <Divider />
        <ListItem 
          onClick={() => handleChange(0)}
          button
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary={DAILY} />
        </ListItem>
        <Divider />
        <ListItem 
          onClick={() => handleChange(1)}
          button
        >
          <ListItemIcon>
            <MoneyTwoTone />
          </ListItemIcon>
          <ListItemText primary={MONTHLY} />
        </ListItem>
        <Divider />
        <ListItem 
          onClick={() => handleChange(2)}
          disabled
          button
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary={YEARLY} />
        </ListItem>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container 
          maxWidth="lg" 
          className={classes.container}
        >
          <TabsComponent />
          <Divider />
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            <Grid item lg={12}>
              <Paper>
              <ListItem 
                onClick={() => setOpenModalId({
                  id: '', 
                  date: '',
                  open: true
                })}
              >
                <ListItemAvatar>
                  <Avatar className={clsx(classes.green, classes.large)}>
                    <PlusOneOutlinedIcon 
                      color="action" 
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="ADD NEW FACILITY" 
                  secondary="Right now" 
                  className={classes.textToRight}
                />
              </ListItem>
              </Paper>
            </Grid>
            <Grid item lg={12}>
              <Paper>
                <Table />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Home;