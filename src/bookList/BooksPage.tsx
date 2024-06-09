import React from 'react';
import BookTable from './BookTable';
import AddBookForm from './AddBookForm';

const BooksPage = () => {
  return (
    <div>
      <h1>Books</h1>
      <AddBookForm />
      <BookTable />
    </div>
  );
};

export default BooksPage;
