import React, { useEffect, useState } from 'react';
import { LibraryClient } from '../api/library-client';
import NavbarAfterLogin from '../NavbarAfterLogin/NavbarAfterLogin';

const HomePageAfterLogin = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUserRole = LibraryClient.getLoggedInUserRole();
    setRole(loggedInUserRole);
  }, []);

  return (
    <div>
      <NavbarAfterLogin role={role} />
      {role === 'ROLE_LIBRARIAN' && <h1>Hello Librarian!</h1>}
      {role === 'ROLE_READER' && <h1>Hello Reader!</h1>}
    </div>
  );
};

export default HomePageAfterLogin;
