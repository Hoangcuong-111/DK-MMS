import React from 'react';
import DarkModeToggle from './ui/DarkModeToggle';
import UserMenu from './ui/UserMenu';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DK</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">DK CMMS</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Báo cáo</p>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;