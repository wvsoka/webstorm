import React from 'react';
import './App.css';
import LoginForm from './loginForm/LoginForm';
import BookTable from './bookList/BookTable';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './homePage/HomePage';
import About from './homePage/About';
import LoanTable from './LoanList/LoanTable';
import ApiProvider from './api/ApiProvider';
import HomePageAfterLogin from './HomePageAfterLogin/HomePageAfterLogin';
import AddBookForm from './bookList/AddBookForm';
import AddLoanForm from './LoanList/AddLoanForm';

function App() {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePageAfterLogin />} />
        <Route path="/book/getAll" element={<BookTable />} />
        <Route path="/loan/getAll" element={<LoanTable />} />
        <Route path="/about" element={<About />} />
        <Route path={'/book/add'} element={<AddBookForm />} />
        <Route path={'/loan/add'} element={<AddLoanForm />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </ApiProvider>
  );
}

export default App;
