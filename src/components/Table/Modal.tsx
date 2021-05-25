import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MainContext } from '../../utils/context';
import MenuItem from '@material-ui/core/MenuItem';
import { category, IExpense } from '../../utils/sample-data';

interface IForm {
  id?: string;
  date?: string;
  name?: string;
  category: { label: category, value: category }|null
  value: number;
}


const FormModal = () => {
  const { mainData, openModalId, setOpenModalId } = React.useContext(MainContext);
  const [values, setValues] = React.useState<IForm|null>(null)

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
        ...editedItem,
        category: editedItem 
        ? { 
          label: category[editedItem.category], 
          value: category[editedItem?.category] } 
        : null
      })
    }
    return ({
      date: '',
      name: '',
      category: { label: category.food, value: category.food},
      value: 0,
    })
  }, [openModalId.id])
  console.log('🚀 ~ file: Modal.tsx ~ line 56 ~ initialValues ~ initialValues', values);

  React.useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleChangeCategory = React.useCallback((currentCategory) => {
    console.log('🚀 ~ file: Modal.tsx ~ line 60 ~ handleChangeCategory ~ currentCategory', currentCategory);
  }, [])

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
          <TextField
            autoFocus
            // error
            // label="Error"
            defaultValue={values?.date}
            // helperText="Incorrect entry."
            margin="dense"
            id="date"
            label="Date"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            defaultValue={values?.name}
            id="name"
            label="Facility name"
            type="text"
            fullWidth
          />
          <TextField
            id="standard-select-category"
            select
            label="Category"
            value={values?.category?.value}
            onChange={handleChangeCategory}
            helperText="Please select your category"
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
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            {!!openModalId.id ? 'Edit' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormModal;