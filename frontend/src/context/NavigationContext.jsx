import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [breadcrumb, setBreadcrumb] = useState([{ title: 'Dashboard', path: 'dashboard' }]);

  const navigateTo = (page, title) => {
    setCurrentPage(page);
    setBreadcrumb([{ title, path: page }]);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, breadcrumb, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};