import React, { FC } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { TFormErrors, TFormState } from './types';
import s from './styles';

const validation = (values: TFormState): TFormErrors => {
  const errors = {} as TFormErrors;
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

const AddItemModal: FC<{
  open: boolean;
  onClose: () => void;
  type: 'group' | 'exercise';
}> = props => {
  const { open, onClose, type } = props;

  const handleSave = (values: TFormState, helpers: FormikHelpers<TFormState>) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      helpers.setSubmitting(false);
    }, 400);
    onClose();
  };

  const formik = useFormik<TFormState>({
    initialValues: { title: '', description: '' },
    validate: validation,
    onSubmit: handleSave,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          Add New Muscles {type.charAt(0).toUpperCase() + type.substring(1)}
        </DialogTitle>
        <DialogContent sx={s.content}>
          <TextField
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            onChange={formik.handleChange}
            helperText={formik.touched.title && formik.errors.title}
            autoFocus
            id="title"
            name="title"
            label={`${type.charAt(0).toUpperCase() + type.substring(1)} title`}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formik.values.description}
            error={formik.touched.description && Boolean(formik.errors.description)}
            onChange={formik.handleChange}
            helperText={formik.touched.description && formik.errors.description}
            multiline
            id="description"
            name="description"
            label={`${type.charAt(0).toUpperCase() + type.substring(1)} description`}
            type="textarea"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!formik.isValid} type={'submit'}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddItemModal;
