import React from 'react';
import { useState } from 'react';
import { useApi } from '../api/ApiProvider';
import './AddBookForm.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddBookForm = () => {
  const apiClient = useApi();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    id: 0,
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publishYear: 0,
    availableCopies: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.addBook(bookData);
      setSuccessMessage(t('BookAddedSuccess'));
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
          <label htmlFor="isbn">{t('ISBN')}</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            placeholder={t('ISBN')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">{t('Title')}</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder={t('Title')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">{t('Author')}</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder={t('Author')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publisher">{t('Publisher')}</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder={t('Publisher')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishYear">{t('Year of publication')}</label>
          <input
            type="text"
            id="publishYear"
            name="publishYear"
            placeholder={t('Year of publication')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableCopies">{t('Available copies')}</label>
          <input
            type="text"
            id="availableCopies"
            name="availableCopies"
            placeholder={t('Available copies')}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">{t('Add Book')}</button>
        </div>
      </form>
      <div className="button-group">
        <button onClick={() => navigate('/home')}>{t('Back')}</button>
      </div>
    </div>
  );
};

export default AddBookForm;
