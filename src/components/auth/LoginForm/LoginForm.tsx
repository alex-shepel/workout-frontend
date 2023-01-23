import React, { FC } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { LoginFormErrors, LoginFormValues } from './types';
import { Link } from 'react-router-dom';
import { Path } from 'types/enums';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useMutation } from 'react-query';
import { useAuthService } from 'hooks/services';
import s from './styles';

const validate = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {};
  if (!values.Email) {
    errors.Email = 'Required';
  }
  if (!values.Password) {
    errors.Password = 'Required';
  }
  return errors;
};

const LoginForm: FC = () => {
  const authService = useAuthService();

  const { mutate: login, isLoading: isAuthing } = useMutation(authService.login);

  const submit = async (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => {
    login(values);
    helpers.setSubmitting(false);
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: { Email: '', Password: '' },
    validate,
    onSubmit: submit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={s.content}>
        <TextField
          value={formik.values.Email}
          error={formik.touched.Email && !!formik.errors.Email}
          onChange={formik.handleChange}
          helperText={formik.touched.Email && formik.errors.Email}
          autoFocus
          id="Email"
          name="Email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          value={formik.values.Password}
          error={formik.touched.Password && !!formik.errors.Password}
          onChange={formik.handleChange}
          helperText={formik.touched.Password && formik.errors.Password}
          id="Password"
          name="Password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
        <Button
          variant={'contained'}
          disabled={!formik.isValid}
          type={'submit'}
          sx={s.primaryButton}
        >
          Login
          {isAuthing && <CircularProgress size={12} color={'inherit'} />}
        </Button>
        <Button component={Link} to={`/${Path.REGISTER}`}>
          Register
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
