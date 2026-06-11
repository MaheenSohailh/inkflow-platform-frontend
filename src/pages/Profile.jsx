import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form fields state
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [btnLoading, setBtnLoading] = useState(false);

  // Token config helper
  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return token ? { headers: { 'Authorization': `Bearer ${token}` } } : null;
  };

  // 1. Fetch Profile on Load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = getAuthConfig();
        if (!config) {
          setError("Please log in first.");
          setLoading(false);
          return;
        }

<<<<<<< Updated upstream
       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, config);
        
=======
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, config);

>>>>>>> Stashed changes
        const userData = res.data.user || res.data;
        setUser(userData);
        setFormData({ name: userData.name || '', bio: userData.bio || '' });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 2. Handle Update Save
  const handleSave = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const config = getAuthConfig();
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile/update`, formData, config);
<<<<<<< Updated upstream
      
=======

>>>>>>> Stashed changes
      if (res.data.success) {
        const updatedUser = res.data.user;

        setUser(updatedUser);
        setFormData({
          name: updatedUser.name || '',
          bio: updatedUser.bio || ''
        });

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
        alert("Profile data saved successfully!");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error occurred while saving data");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="font-semibold text-sm tracking-wide text-slate-500">Loading profile account...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-red-600 bg-red-50 px-5 py-3 rounded-2xl text-sm border border-red-100 font-medium shadow-sm flex items-center gap-2">
        <span>⚠️</span> {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Profile Hero Cover Element */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-700 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-20 h-20 bg-slate-900 border-4 border-white text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md">
              {formData.name ? formData.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="p-8 pt-14">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-items sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6 mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Profile</h1>
              <p className="text-xs text-slate-500 mt-1">Manage your personal details and dashboard account settings.</p>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex justify-center items-center px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all cursor-pointer shadow-sm border border-indigo-100/50"
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>

          {/* Profile Form / Details */}
          <form onSubmit={handleSave} className="space-y-6">

            {/* Account Type/Role Status Badge Display (Top par shift kiya taaki highlight ho) */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Account Type</span>
                <span className="text-xs text-slate-500">Your account system role and permissions.</span>
              </div>

              {/* Premium Flowbite Style Badge Conditional Mapping */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border shadow-sm ${user?.role === 'admin'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                {user?.role === 'admin' ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
                    🔑 Admin Panel Access
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    👤 Standard User
                  </>
                )}
              </span>
            </div>

            {/* Email Field (Always Disabled) */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Email Address (Cannot be changed)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 bg-slate-50/80 border border-slate-200/60 rounded-xl text-sm text-slate-400 cursor-not-allowed outline-none select-none font-medium"
              />
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-all outline-none ${isEditing
                    ? 'border-indigo-600 ring-4 ring-indigo-600/10 bg-white text-slate-900 font-medium'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 cursor-not-allowed'
                  }`}
                placeholder="Enter your name"
              />
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Bio Description
              </label>
              <textarea
                rows="4"
                disabled={!isEditing}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-all outline-none resize-none ${isEditing
                    ? 'border-indigo-600 ring-4 ring-indigo-600/10 bg-white text-slate-900'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 cursor-not-allowed'
                  }`}
                placeholder="Write a short bio about yourself..."
              />
            </div>

            {/* Action Buttons (Sirf Edit Mode me dikhenge) */}
            {isEditing && (
              <div className="flex justify-end space-x-3 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: user?.name || '', bio: user?.bio || '' });
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={btnLoading}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl transition-all cursor-pointer shadow-sm shadow-indigo-600/20"
                >
                  {btnLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
