import React, { useState } from 'react';
import { useApi } from '../api/ApiProvider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddLoanForm = () => {
  const apiClient = useApi();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [userData, setUserData] = useState({
    id: 0,
    login: '',
    password: '',
    role: '',
    eMail: '',
    fullName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.addUser(userData);
      setSuccessMessage('User added successfully');
    } catch (error) {
      setError(t('Error'));
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">{'login'}</label>
          <input
            type="text"
            name="login"
            placeholder={t('login')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t('password')}</label>
          <input
            type="password"
            name="password"
            placeholder={t('password')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">{t('Role')}</label>
          <input
            type="text"
            name="role"
            placeholder={t('Role')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eMail">{'eMail'}</label>
          <input
            type="text"
            name="eMail"
            placeholder={'email@example.com'}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">{t('Full name')}</label>
          <input
            type="text"
            name="fullName"
            placeholder={t('Full name')}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">{t('Add user')}</button>
        </div>
      </form>
      <div className="button-group">
        <button onClick={() => navigate('/home')}>{t('Back')}</button>
      </div>
    </div>
  );
};
export default AddLoanForm;
