import React from 'react';
import './App.css';
import LoginForm from './loginForm/LoginForm';
import BookTable from './bookList/BookTable';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './homePage/HomePage';
import About from './homePage/About';
import LoanTable from './LoanList/LoanTable';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/book/getAll" element={<BookTable />} />
      <Route path="/loan/getAll" element={<LoanTable />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
