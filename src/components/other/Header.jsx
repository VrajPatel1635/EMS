import React from 'react';
// import { LogOut } from 'lucide-react'; // lucide-react is not directly available in this environment
import LocalStorage from '../../utils/LocalStorage'; // Import the LocalStorage utility

const Header = ({ userName, changeUser }) => {
  const logOutUser = () => {
    // Use the LocalStorage utility to remove the loggedInUser item
    LocalStorage.removeItem('loggedInUser');
    // Call the changeUser prop (which typically navigates to login)
    changeUser(); // No need to pass '' if changeUser already handles logout navigation
    console.log("Header: User logged out.");
  };

  return (
    <div className="flex items-center justify-between bg-white/5 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-white/10 mt-4 mb-8">
      {/* Welcome Message and User Name */}
      <div>
        <h1 className="text-xl md:text-2xl font-medium text-gray-300">Welcome back 👋</h1>
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
          {userName}
        </h2>
      </div>

      {/* Logout Button */}
      <button
        onClick={logOutUser}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 
                   text-white font-semibold rounded-lg shadow-md
                   hover:from-red-700 hover:to-rose-800 
                   hover:shadow-xl hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900
                   transition-all duration-300 ease-in-out active:scale-95"
      >
        {/* Inline SVG for LogOut icon (replaces lucide-react) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" x2="9" y1="12" y2="12"/>
        </svg>
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default Header;
