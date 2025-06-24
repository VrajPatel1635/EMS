import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#111827] to-[#0f172a] font-inter"> {/* Deeper dark background, added font */}
      <div className="w-full max-w-md p-10 space-y-8 rounded-3xl shadow-2xl bg-[#1a202c] border border-gray-700 transform transition-all duration-300 hover:scale-[1.005] hover:shadow-3xl"> {/* Enhanced container */}
        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-md">Welcome Back!</h2> {/* Larger, bolder heading */}
        <p className="text-center text-gray-400 mb-6">Sign in to your account</p> {/* Added subtitle */}

        <form onSubmit={submitHandler} className="space-y-6"> {/* Adjusted spacing */}
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">Email Address</label> {/* Bolder label */}
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-[#0d131f] border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-300">Password</label> {/* Bolder label */}
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-[#0d131f] border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
          
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 text-white font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-[#1a202c]"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
