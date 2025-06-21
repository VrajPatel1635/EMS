import React from 'react'
import { LogOut } from 'lucide-react' // Optional icon

const Header = ({ userName, changeUser }) => {
  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    changeUser('')
  }

  return (
    <div className="flex items-center justify-between bg-[#1f2937] text-white p-5 rounded-xl shadow-md">
      <div>
        <h1 className="text-xl md:text-2xl font-medium text-gray-300">Welcome back 👋</h1>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {userName}
        </h2>
      </div>
      <button
        onClick={logOutUser}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 
                   text-white font-semibold rounded-lg 
                   hover:from-red-600 hover:to-rose-700 
                   hover:shadow-[0_0_15px_rgba(244,63,94,0.5)] 
                   transition-all duration-300 ease-in-out hover:font-bold"
      >
        <LogOut className="w-5 h-5" /> Log Out
      </button>
    </div>
  )
}

export default Header
