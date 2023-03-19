import React, { FC } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { FormErrors } from 'types/common';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { FormValues, Props } from './types';
import s from './styles';

const Set: FC<Props> = props => {
  const { set, onUpdate } = props;

  const validate = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};
    if (!set.Completed && Number(values.Weight) <= 0) {
      errors.Weight = 'Required';
    }
    if (!set.Completed && Number(values.Repetitions) <= 0) {
      errors.Repetitions = 'Required';
    }
    return errors;
  };

  const submit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    onUpdate({
      ID: set.ID,
      Weight: Number(values.Weight),
      Repetitions: Number(values.Repetitions),
      Completed: !set.Completed,
    });
    helpers.setSubmitting(false);
  };

  const formik = useFormik<FormValues>({
    initialValues: { Weight: '', Repetitions: '' },
    validate,
    onSubmit: submit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container sx={s.form}>
        <TextField
          value={formik.values.Weight}
          error={formik.touched.Weight && !!formik.errors.Weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="Weight"
          name="Weight"
          label="Weight"
          type="number"
          fullWidth
          variant="standard"
          disabled={set.Completed}
          placeholder={String(set.Weight)}
        />
        <TextField
          value={formik.values.Repetitions}
          error={formik.touched.Repetitions && !!formik.errors.Repetitions}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="Repetitions"
          name="Repetitions"
          label="Repetitions"
          type="number"
          fullWidth
          variant="standard"
          disabled={set.Completed}
          placeholder={String(set.Repetitions)}
        />
        <IconButton type={'submit'} disabled={!set.Completed && !formik.isValid}>
          {set.Completed ? (
            <CheckBoxIcon color={'primary'} />
          ) : (
            <CheckBoxOutlineBlankIcon color={formik.isValid ? 'primary' : 'inherit'} />
          )}
        </IconButton>
      </Grid>
    </form>
  );
};

export default Set;
