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
import { IProps, TFormErrors, TFormState } from './types';
import s from './styles';

const validation = (values: TFormState): TFormErrors => {
  const errors = {} as TFormErrors;
  if (!values.Title) {
    errors.Title = 'Required';
  }
  if (!values.Description) {
    errors.Description = 'Required';
  }
  return errors;
};

const AddItemModal: FC<IProps> = props => {
  const { open, onClose, onSubmit, goal } = props;

  const handleSave = (values: TFormState, helpers: FormikHelpers<TFormState>) => {
    setTimeout(() => {
      onSubmit(values);
      helpers.setSubmitting(false);
    }, 400);
    formik.resetForm();
    onClose();
  };

  const formik = useFormik<TFormState>({
    initialValues: { Title: '', Description: '' },
    validate: validation,
    onSubmit: handleSave,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add New {goal}</DialogTitle>
        <DialogContent sx={s.content}>
          <TextField
            value={formik.values.Title}
            error={formik.touched.Title && Boolean(formik.errors.Title)}
            onChange={formik.handleChange}
            helperText={formik.touched.Title && formik.errors.Title}
            autoFocus
            id="Title"
            name="Title"
            label={`${goal} title`}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={formik.values.Description}
            error={formik.touched.Description && Boolean(formik.errors.Description)}
            onChange={formik.handleChange}
            helperText={formik.touched.Description && formik.errors.Description}
            multiline
            id="Description"
            name="Description"
            label={`${goal} description`}
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
