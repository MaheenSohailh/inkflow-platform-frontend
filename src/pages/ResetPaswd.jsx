import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPaswd = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 🔥 Boolean banaya
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 🔥 Confirm password ke liye alag state
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPswd = async (e) => {
    e.preventDefault();

    // Submit se pehle final check agar passwords match nahi karte
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-pswd`, { token, password });

      if (data.success) {
        alert("🎉 Password reset successfully!");
        setPassword("");
        setConfirmPassword(""); // 🔥 State setter use kiya
        navigate("/auth");
      }
    } catch (err) {
      // 🔥 Catch block syntax fix kiya
      console.log("Reset Password Failed : ", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Password reset failed.");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // 🔥 Strict match lagaya (includes hata kar)
    if (password !== value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800">Reset Password</h1>

        <form onSubmit={handleResetPswd} className="space-y-4">
          {/* Main Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
            <div className="relative">
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"} // 🔥 Managed by showPassword
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-red-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword" // 🔥 Name unique kiya
                value={confirmPassword}
                onChange={handleConfirmPassword}
                type={showConfirmPassword ? "text" : "password"} // 🔥 Managed by showConfirmPassword independently
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 text-xs font-semibold text-gray-600 hover:text-red-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className='text-sm text-red-500 font-medium'>{error}</p>}

          <button
            type="submit"
            disabled={!!error || !password}
            className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 font-semibold shadow-md disabled:bg-gray-400 disabled:transform-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPaswd;