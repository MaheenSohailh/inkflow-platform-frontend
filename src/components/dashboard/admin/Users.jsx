import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);

  
useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Loading start
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
     });
      console.log("API Response:", res.data); // <--- Yeh line check karein
       setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false); // <--- Yeh line add karna zaroori hai!
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem('token');
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Delete hone ke baad list ko update karein (filter karke)
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return (
    <div className="p-4 md:p-6 min-h-screen">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-slate-800">Manage Users</h2>

      {/* Container with overflow-x-auto for mobile scrolling */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-200 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-600 text-sm">Name</th>
              <th className="p-4 font-semibold text-slate-600 text-sm">Email</th>
              <th className="p-4 font-semibold text-slate-600 text-sm">Role</th>
              <th className="p-4 font-semibold text-slate-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-700">{user.name || "N/A"}</td>
                  <td className="p-4 text-sm text-slate-600">{user.email}</td>
                  <td className="p-4">
                    <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteUser(user._id)} // ID pass karein
                      className="text-red-500 text-sm font-semibold hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-400 text-sm">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
