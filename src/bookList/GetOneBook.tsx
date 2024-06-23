import React, { useEffect, useState } from 'react';
import { BookDto } from '../api/dto/book.dto';
import { useApi } from '../api/ApiProvider';
import './GetOneBook.css';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LibraryClient } from '../api/library-client';

const GetOneBook: React.FC = () => {
  const [bookId, setBookId] = useState<number | undefined>(undefined);
  const [book, setBook] = useState<BookDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUserRole = LibraryClient.getLoggedInUserRole();
    setRole(loggedInUserRole);
  }, []);

  const handleSearch = async () => {
    if (bookId) {
      const response = await apiClient.getBookById(bookId);
      if (response.success) {
        setBook(response.data);
        setError(null);
      } else {
        setError(`Book with ID ${bookId} not found`);
        setBook(null);
      }
    }
  };

  const handleDelete = async () => {
    if (book?.id) {
      const deleteResponse = await apiClient.deleteBook(book.id);
      if (deleteResponse.success) {
        // Clear book details and reset input field
        setBook(null);
        setBookId(undefined);
        setError(null);
        alert(deleteResponse.data); // Możesz użyć alertu lub innej formy powiadomienia o sukcesie
      } else {
        setError(`Failed to delete book with ID ${book.id}`);
      }
    }
  };

  return (
    <div className="container">
      <h1>{t('Search for a book')}</h1>
      <div className="form-group">
        <label htmlFor="bookId">{t('Enter book ID')}</label>
        <input
          type="number"
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(Number(e.target.value))}
          placeholder={t('Enter book ID')}
        />
      </div>
      <div className="button-group">
        <button onClick={handleSearch}>{t('Search')}</button>
      </div>
      {error && <p className="error">{error}</p>}
      {book && (
        <div className="book-details">
          <div className="book-details-header">
            <AutoStoriesIcon fontSize="large" />
            <h2>{t('Book Details')}</h2>
          </div>
          <p>
            <span>ID:</span> {book.id}
          </p>
          <p>
            <span>ISBN:</span> {book.isbn}
          </p>
          <p>
            <span>{t('Title')}:</span> {book.title}
          </p>
          <p>
            <span>{t('Author')}:</span> {book.author}
          </p>
          <p>
            <span>{t('Publisher')}:</span> {book.publisher}
          </p>
          <p>
            <span>{t('Year of publication')}:</span> {book.publishYear}
          </p>
          <p>
            <span>{t('Available copies')}:</span> {book.availableCopies}
          </p>
          {role === 'ROLE_LIBRARIAN' && (
            <div className="button-group">
              <button onClick={handleDelete}>{t('Delete book')}</button>
            </div>
          )}
        </div>
      )}
      <div className="button-group">
        <button onClick={() => navigate('/home')}>{t('Back')}</button>
      </div>
    </div>
  );
};

export default GetOneBook;
