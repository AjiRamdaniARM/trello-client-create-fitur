"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginMember = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Mengatur perubahan input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mengirim form login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/authLoginMember', formData);

      // Redirect ke dashboard jika login berhasil
      if (res.status === 200) {
        router.push('/Member/layout'); // Sesuaikan dengan path dashboard Anda
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-96 bg-white p-5 rounded shadow">
        <h2 className="text-center text-xl font-bold">Login Member</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginMember;
