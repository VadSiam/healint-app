import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { SortDirection } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { category, IData, IExpense } from '../../utils/sample-data';
import { MainContext } from '../../utils/context';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const sumByMonth = (expenses: IExpense[]): number => {
  return expenses.reduce((acc: number, item: IExpense) => acc + item.value, 0)
}

interface IRow {
  row: IData
}

const Row: React.FC<IRow> = ({ row }) => {
  const classes = useRowStyles();
  const { removeElement, setOpenModalId } = React.useContext(MainContext);
  const [order, setOrder] = React.useState<SortDirection>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IExpense>('category');
  const [open, setOpen] = React.useState<boolean>(false);
  const onChangeOrder = React.useCallback((key: keyof IExpense) => {
    setOrderBy(key);
    setOrder((orderState) => {
      if (orderState === 'asc') {
        return 'desc';
      }
      return 'asc';
    });
  }, [])

  const sortedSubRows = React.useMemo(() => {
    return row.expense.sort((expA, expB) => {
      if (orderBy === 'value') {
        return (
          (order === 'asc') 
            ? (expA.value - expB.value) 
            : (expB.value - expA.value)
        )
      }
      if (orderBy === 'name') {
        return (order === 'asc') 
        ? expB.name.localeCompare(expA.name)
        : expA.name.localeCompare(expB.name);
      }
      if (orderBy === 'category') {
        return (order === 'asc') 
        ? expA.category.toString().localeCompare(expB.category.toString())
        : expB.category.toString().localeCompare(expA.category.toString());
      }
      return 0;
    })
  }, [row, orderBy, order])

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{sumByMonth(row.expense)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sortDirection={order}>
                      <TableSortLabel
                        active={orderBy === 'name'}
                        direction={order || 'asc'}
                        onClick={() => onChangeOrder('name')}
                      >
                        Facility name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={order}>
                      <TableSortLabel
                        active={orderBy === 'category'}
                        direction={order || 'asc'}
                        onClick={() => onChangeOrder('category')}
                      >
                        Category
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      Actions
                    </TableCell>
                    <TableCell 
                      align="right"
                      sortDirection={order}
                    >
                      <TableSortLabel
                        active={orderBy === 'value'}
                        direction={order || 'asc'}
                        onClick={() => onChangeOrder('value')}
                      >
                        Price ($)
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedSubRows.map((detailRow) => (
                    <TableRow key={detailRow.id}>
                      <TableCell component="th" scope="row">
                        {detailRow.name}
                      </TableCell>
                      <TableCell>{category[detailRow.category]}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          aria-label="edit"
                          onClick={() => setOpenModalId({
                            id: detailRow.id, 
                            date: row.date,
                            open: true
                          })}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="secondary" 
                          aria-label="delete"
                          onClick={() => removeElement({ date: row.date, id: detailRow.id })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        {detailRow.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;