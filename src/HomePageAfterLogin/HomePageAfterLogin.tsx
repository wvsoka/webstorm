import React, { useEffect, useState } from 'react';
import { LibraryClient } from '../api/library-client';
import NavbarAfterLogin from '../NavbarAfterLogin/NavbarAfterLogin';
import { useTranslation } from 'react-i18next';

const HomePageAfterLogin = () => {
  const [role, setRole] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loggedInUserRole = LibraryClient.getLoggedInUserRole();
    setRole(loggedInUserRole);
  }, []);

  return (
    <div>
      <NavbarAfterLogin role={role} />
      {role === 'ROLE_LIBRARIAN' && <h1>{t('HelloL')}</h1>}
      {role === 'ROLE_READER' && <h1>{t('HelloR')}</h1>}
    </div>
  );
};

export default HomePageAfterLogin;
