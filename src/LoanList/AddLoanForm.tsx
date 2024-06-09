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
    userLoan: { id: 1 },
    bookLoan: {
      id: 1,
      isbn: '1234567890',
      title: 'Example Title',
      author: 'Example Author',
      publisher: 'Example Publisher',
      publishYear: 2000,
      availableCopies: 0,
    },
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.addLoan(loanData);
      navigate('/loan/getAll');
    } catch (error) {
      setError(t('Error'));
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="loanStartDate"
          placeholder={t('Loan Start Date')}
          onChange={handleChange}
        />
        <input
          type="date"
          name="loanEndDate"
          placeholder={t('Loan End Date')}
          onChange={handleChange}
        />
        <input
          type="date"
          name="bookReturnDate"
          placeholder={t('Book Return Date')}
          onChange={handleChange}
        />
        <input
          type="number"
          name="userLoanId"
          placeholder={t('User ID')}
          onChange={handleChange}
        />
        <input
          type="number"
          name="bookLoanId"
          placeholder={t('Book ID')}
          onChange={handleChange}
        />
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
