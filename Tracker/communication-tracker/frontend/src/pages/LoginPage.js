import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for authentication
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your login API call here to verify credentials
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-semibold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
