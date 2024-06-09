import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Navbar from '../homePage/Navbar';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next'; // Import useNavigate

function LoginForm() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (values: { login: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError('password', t('Invalid'));
        }
      });
      //navigate('/book/getAll');
    },
    [apiClient, navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        login: yup.string().required(t('RequiredLogin')),
        password: yup
          .string()
          .required(t('RequiredPassword'))
          .min(5, t('TooShort')),
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
              label={t('login')}
              variant="standard"
              color="secondary"
              name={t('login')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && formik.errors.login}
              helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
              id="password"
              type="password"
              label={t('password')}
              variant="standard"
              color="secondary"
              name={t('password')}
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
              {t('Log in')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
