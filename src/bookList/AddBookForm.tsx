import React from 'react';
import { useState } from 'react';
import { useApi } from '../api/ApiProvider';
import './AddBookForm.css';
import { useNavigate } from 'react-router-dom'; // Zaimportuj plik CSS

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.addBook(bookData);
      setSuccessMessage('Book added successfully'); // Ustaw komunikat sukcesu
    } catch (error) {
      setError(
        'Wystąpił błąd podczas dodawania książki. Spróbuj ponownie później.',
      );
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            placeholder="ISBN"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Publisher"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishYear">Publish Year</label>
          <input
            type="text"
            id="publishYear"
            name="publishYear"
            placeholder="Publish Year"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableCopies">Available Copies</label>
          <input
            type="text"
            id="availableCopies"
            name="availableCopies"
            placeholder="Available Copies"
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">Add Book</button>
        </div>
      </form>
      <div className="button-group">
        <button onClick={() => navigate('/home')}>Back</button>
      </div>
    </div>
  );
};

export default AddBookForm;
