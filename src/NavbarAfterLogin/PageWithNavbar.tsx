import React from 'react';
import NavbarAfterLogin from './NavbarAfterLogin';

type Props = {
  children: React.ReactNode;
  role: string; // Dodajemy rolę jako wymaganą właściwość
};

const PageWithNavbar: React.FC<Props> = ({ children, role }) => {
  return (
    <>
      <NavbarAfterLogin role={role} />
      {children}
    </>
  );
};

export default PageWithNavbar;
