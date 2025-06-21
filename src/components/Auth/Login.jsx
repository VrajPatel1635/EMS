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
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#1e1e2f] via-[#111827] to-[#0f172a]">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl bg-[#1e293b] border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
