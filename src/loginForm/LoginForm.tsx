import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      console.log(values);
      navigate('/books');
    },
    [navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(5, 'Password is too short'),
      }),
    [],
  );

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
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
            id="username"
            label="username"
            variant="standard"
            color="secondary"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
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
  );
}

export default LoginForm;
