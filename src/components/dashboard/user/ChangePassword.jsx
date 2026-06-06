import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation: Check if new passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: '❌ New password and Confirm Password do not match!' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: '❌ New password must be at least 8 characters long!' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };

      const res = await axios.put('http://localhost:8000/api/auth/change-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      }, config);

      if (res.data.success) {
        setMessage({ type: 'success', text: res.data.message });
        // Form khali karne ke liye
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Something went wrong while changing the password!'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-8">

        {/* Header */}
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h1 className="text-xl font-bold text-slate-900">Security Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Update your password to keep your account secure</p>
        </div>

        {/* Alert Messages */}
        {message.text && (
          <div className={`p-3.5 text-sm rounded-xl mb-5 border ${message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
              : 'bg-red-50 text-red-700 border-red-100'
            }`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Old Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Current Password 
            </label>
            <input
              type="password"
              name="oldPassword"
              required
              value={passwordData.oldPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              New Password 
            </label>
            <input
              type="password"
              name="newPassword"
              required
              value={passwordData.newPassword}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={passwordData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl transition-colors cursor-pointer text-center"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ChangePassword;