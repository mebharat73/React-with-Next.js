'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/api/auth';  // adjust your import path

export default function ResetPasswordPage({ params }) {
  const { userId } = params; // from dynamic folder [userId]
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({ userId, token, password, confirmPassword });
      setMessage('Password reset successful. You can now log in.');
    } catch (err) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Reset Your Password</h2>
      <form onSubmit={handleReset} className="space-y-4 mt-4">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border p-2"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
