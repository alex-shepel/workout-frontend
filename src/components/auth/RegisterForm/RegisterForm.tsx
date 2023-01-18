import React, { FC } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { RegisterFormErrors, RegisterFormValues } from './types';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from 'types/enums';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useMutation } from 'react-query';
import { useAuthService } from 'hooks/services';
import { AuthContext } from 'context/Auth.context';
import { useAppContext } from 'hooks/utils';
import s from './styles';

const validate = (values: RegisterFormValues): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};
  if (!values.Email) {
    errors.Email = 'Required';
  }
  if (!values.Password) {
    errors.Password = 'Required';
  }
  if (!values.PasswordConfirmation) {
    errors.PasswordConfirmation = 'Required';
  } else if (values.Password !== values.PasswordConfirmation) {
    errors.PasswordConfirmation = 'Passwords are not the same.';
  }
  return errors;
};

const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const authService = useAuthService();
  const authContext = useAppContext(AuthContext);

  const { mutate: register, isLoading: isAuthing } = useMutation(authService.register, {
    onSuccess: data => {
      authContext.setData(data);
      navigate('/diagram', { replace: true });
    },
  });

  const submit = (values: RegisterFormValues, helpers: FormikHelpers<RegisterFormValues>) => {
    register(values);
    helpers.setSubmitting(false);
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues: { Email: '', Name: '', Password: '', PasswordConfirmation: '' },
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
          value={formik.values.Name}
          onChange={formik.handleChange}
          id="Name"
          name="Name"
          label="Name"
          type="text"
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
        <TextField
          value={formik.values.PasswordConfirmation}
          error={formik.touched.PasswordConfirmation && !!formik.errors.PasswordConfirmation}
          onChange={formik.handleChange}
          helperText={formik.touched.PasswordConfirmation && formik.errors.PasswordConfirmation}
          id="PasswordConfirmation"
          name="PasswordConfirmation"
          label="Password Confirmation"
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
          Register
          {isAuthing && <CircularProgress size={12} color={'inherit'} />}
        </Button>
        <Button component={Link} to={`/${Paths.LOGIN}`}>
          Login
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
