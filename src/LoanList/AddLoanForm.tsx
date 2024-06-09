import React, { useState } from 'react';
import { useApi } from '../api/ApiProvider';
import { useNavigate } from 'react-router-dom';
import './AddLoanFrom.css';

const AddLoanForm = () => {
  const apiClient = useApi();
  const navigate = useNavigate();

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
      setError('Error occurred.');
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="loanStartDate"
          placeholder="Loan Start Date"
          onChange={handleChange}
        />
        <input
          type="date"
          name="loanEndDate"
          placeholder="Loan End Date"
          onChange={handleChange}
        />
        <input
          type="date"
          name="bookReturnDate"
          placeholder="Book Return Date"
          onChange={handleChange}
        />
        <input
          type="number"
          name="userLoanId"
          placeholder="User ID"
          onChange={handleChange}
        />
        <input
          type="number"
          name="bookLoanId"
          placeholder="Book ID"
          onChange={handleChange}
        />
        <div className="button-group">
          <button type="submit">Add Loan</button>
        </div>
      </form>
      <div className="button-group">
        <button onClick={() => navigate('/home')}>Back</button>
      </div>
    </div>
  );
};
export default AddLoanForm;
