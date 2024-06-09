import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarAfterLogin.css';
import { useTranslation } from 'react-i18next';
type Props = {
  role: string | null;
};

const NavbarAfterLogin: React.FC<Props> = ({ role }) => {
  const { t, i18n } = useTranslation();

  return (
    <header className="header">
      <Link to="/" className="logo">
        {t('Library')}
      </Link>
      <nav className="navbar">
        <Link to="/book/getAll">{t('Books')}</Link>
        {role === 'ROLE_LIBRARIAN' && (
          <>
            <Link to="/loan/getAll">{t('Loans')}</Link>
            <Link to="/book/add">{t('Add Book')}</Link>
            <Link to="/loan/add">{t('Add Loan')}</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavbarAfterLogin;
