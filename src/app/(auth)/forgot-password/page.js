'use client';

import { useState } from 'react';
import { forgotPassword } from '@/api/auth'; // Adjust this path if needed

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email); // 👈 Call your api method
      setMessage('Password reset link sent to your email.');
    } catch (err) {
      console.error(err);
      setMessage('Error sending password reset email.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2"
        />
        <button type="submit" className="bg-[#007BFF] text-[#1A1A1A] px-4 py-2">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
