import React from 'react';
import './App.css';
import LoginForm from './loginForm/LoginForm';
import BookTable from './bookList/BookTable';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/books" element={<BookTable />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
