import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarAfterLogin.css';
type Props = {
  role: string | null;
};

const NavbarAfterLogin: React.FC<Props> = ({ role }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Library
      </Link>
      <nav className="navbar">
        <Link to="/book/getAll">Books</Link>
        {role === 'ROLE_LIBRARIAN' && (
          <>
            <Link to="/loan/getAll">Loans</Link>
            <Link to="/book/add">Add Book</Link>
            <Link to="/loan/add">Add Loan</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavbarAfterLogin;
