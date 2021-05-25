import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MainContext } from '../../utils/context';
import MenuItem from '@material-ui/core/MenuItem';
import { category } from '../../utils/sample-data';
import { KeyboardDatePicker,  MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DATE_FORMAT } from '../../utils/constants';

interface IForm {
  id?: string;
  date?: string;
  name?: string;
  category: category|null
  value: number;
}


const FormModal = () => {
  const { 
    mainData, 
    openModalId, 
    setOpenModalId,
    editElement,
    createElement,
  } = React.useContext(MainContext);
  const [values, setValues] = React.useState<IForm>({
    date: '',
    name: '',
    category: category.food,
    value: 0,
  })

  const [valuesError, setError] = React.useState({
    date: false,
    name: false,
    category: false,
    value: false,
  })
  const handleClose = React.useCallback(() => {
    setOpenModalId({
      id: '',
      date: '',
      open: false,
    });
  }, []);

  const categoriesOption = React.useMemo(() => {
    return Object.values(category).map(catItem => ({ label: catItem, value: catItem }));
  }, [])

  const initialValues = React.useMemo(() => {
    if (!!openModalId.id) {
      const editedItem = mainData.find(item => item.date === openModalId.date)?.expense
      .find(exp => exp.id === openModalId.id)
      return ({
        date: openModalId.date,
        name: editedItem?.name ?? '',
        category: editedItem 
          ? category[editedItem.category]
          : null,
        value: editedItem?.value ?? 0,
      })
    }
    return ({
      date: format(new Date (), DATE_FORMAT),
      name: '',
      category: category.food,
      value: 0,
    })
  }, [openModalId.id])

  React.useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleChangeDate = React.useCallback((currentDate) => {
    if (new Date(currentDate).toString() === 'Invalid Date') {
      setError(errState => {
        return ({...errState, date: true})
      })
      return;
    }
    setError(errState => {
      return ({...errState, date: false})
    })
    setValues(state => ({
      ...state,
      date: format(new Date (currentDate), DATE_FORMAT),
    }))
  }, [])

  const handleChangeName = React.useCallback((currentName) => {
    if (!currentName.target.value) {
      setError(errState => {
        return ({...errState, name: true})
      })
      return;
    }
    setError(errState => {
      return ({...errState, name: false})
    })
    setValues(state => ({
      ...state,
      name: currentName.target.value,
    }))
  }, [])

  const handleChangeCategory = React.useCallback((currentCategory) => {
    if (!currentCategory.target.value) {
      setError(errState => {
        return ({...errState, category: true})
      })
      return;
    }
    setError(errState => {
      return ({...errState, category: false})
    })
    setValues(state => ({
      ...state,
      category: currentCategory.target.value,
    }))
  }, [])

  const handleChangeAmount = React.useCallback((currentAmount) => {
    if (!(+currentAmount.target.value)) {
      setError(errState => {
        return ({...errState, value: true})
      })
      return;
    }
    setError(errState => {
      return ({...errState, value: false})
    })
    setValues(state => ({
      ...state,
      value: +currentAmount.target.value,
    }))
  }, [])

  const onSubmit = React.useCallback(() => {
    const isError = Object.values(valuesError).some(v => v);
    const isEmptyString = Object.values(values).some(v => !v);
    if (isError || isEmptyString) {
      return;
    }
    if (!!openModalId.id) {
      editElement({
        date: values.date ?? '',
        expense: {
          id: openModalId.id,
          name: values.name ?? '',
          category: values.category as category,
          value: values.value,
        }
      })
    } else {
      createElement({
        date: values.date ?? '',
        expense: {
          name: values.name ?? '',
          category: values.category as category,
          value: values.value,
        }
      })
    }
    handleClose();
  }, [values, valuesError])

  return (
    <div>
      <Dialog open={!!openModalId.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {!!openModalId.id ? 'Edit' : 'Create'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${!!openModalId.id ? 'Edit' : 'Create'} your expense please`}
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format={DATE_FORMAT}
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={new Date(values?.date ?? new Date())}
              onChange={handleChangeDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              disabled={!!openModalId.id}
              error={valuesError.date}
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            defaultValue={values?.name}
            id="name"
            label="Facility name"
            type="text"
            fullWidth
            onChange={handleChangeName}
            error={valuesError.name}
          />
          <TextField
            id="standard-select-category"
            select
            label="Category"
            value={values?.category}
            onChange={handleChangeCategory}
            helperText="Please select your category"
            error={valuesError.category}
          >
            {categoriesOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="value"
            defaultValue={values?.value}
            label="Amount"
            type="number"
            fullWidth
            onChange={handleChangeAmount}
            error={valuesError.value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            {!!openModalId.id ? 'Edit' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormModal;