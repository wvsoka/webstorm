import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarAfterLogin.css';
import { useTranslation } from 'react-i18next';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

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
        <Link to="/book/getOne">{'Search book'}</Link>
        {role === 'ROLE_LIBRARIAN' && (
          <>
            <Link to="/book/add">{t('Add Book')}</Link>
            <Link to="/loan/getAll">{t('Loans')}</Link>
            <Link to="/loan/add">{t('Add Loan')}</Link>
            <Link to="/user/getAll">{'Users'}</Link>
            <Link to="/user/add">{'Add User'}</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavbarAfterLogin;
