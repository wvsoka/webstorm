import React, { useState } from 'react';
import { useApi } from '../api/ApiProvider';
import { useNavigate } from 'react-router-dom';
import './AddLoanFrom.css';
import { useTranslation } from 'react-i18next';

const AddLoanForm = () => {
  const apiClient = useApi();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [loanData, setLoanData] = useState({
    id: 1,
    loanStartDate: new Date(),
    loanEndDate: new Date(),
    bookReturnDate: new Date(),
    userLoan: 1,
    bookLoan: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.addLoan(loanData);
      setSuccessMessage('Loan added successfully');
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
          <label htmlFor="loanStartDate">{'Loan start date'}</label>
          <input
            type="date"
            name="loanStartDate"
            placeholder={t('Loan Start Date')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loanEndDate">{'Loan end date'}</label>
          <input
            type="date"
            name="loanEndDate"
            placeholder={t('Loan End Date')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookReturnDate">{'Book return date'}</label>
          <input
            type="date"
            name="bookReturnDate"
            placeholder={t('Book Return Date')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userLoan">{'User ID'}</label>
          <input
            type="number"
            name="userLoan"
            placeholder={t('User ID')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookLoan">{'Book ID'}</label>
          <input
            type="number"
            name="bookLoan"
            placeholder={t('Book ID')}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">{t('Add Loan')}</button>
        </div>
      </form>
      <div className="button-group">
        <button onClick={() => navigate('/home')}>{t('Back')}</button>
      </div>
    </div>
  );
};
export default AddLoanForm;
