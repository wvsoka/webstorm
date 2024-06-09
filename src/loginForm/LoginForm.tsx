import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Navbar from '../homePage/Navbar';
import { useApi } from '../api/ApiProvider'; // Import useNavigate

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (values: { login: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError('password', 'Invalid username or password');
        }
      });
      //navigate('/book/getAll');
    },
    [apiClient, navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        login: yup.string().required('Login is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(5, 'Password is too short'),
      }),
    [],
  );

  return (
    <div>
      <Navbar />
      <Formik
        initialValues={{ login: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <form
            className="loginForm"
            id="signForm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <TextField
              id="login"
              label="login"
              variant="standard"
              color="secondary"
              name="login"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && formik.errors.login}
              helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
              id="password"
              type="password"
              label="password"
              variant="standard"
              color="secondary"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              form="signForm"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Zaloguj się
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
