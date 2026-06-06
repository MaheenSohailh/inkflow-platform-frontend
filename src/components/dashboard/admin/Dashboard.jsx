import React, { useState, useEffect } from 'react';
import { FileText, Users, DollarSign } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState({ totalBlogs: 0, activeUsers: 0, revenue: 0, recentBlogs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        // Login ke waqt token save kiya hoga, usey nikalna hai
        const token = localStorage.getItem('token');

        const res = await axios.get('/api/admin/dashboard-stats', {
          headers: {
            Authorization: `Bearer ${token}` // Yahan token bhej rahe hain
          }
        });
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Auth Error:", err);
        setLoading(false);
      }
    };
    getStats();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  const stats = [
    { title: 'Total Blogs', value: data.totalBlogs || '0', icon: <FileText className="text-indigo-600" /> },
    { title: 'Active Users', value: data.activeUsers || '0', icon: <Users className="text-emerald-600" /> },
    { title: 'Revenue', value: `$${data.revenue || '0'}`, icon: <DollarSign className="text-amber-600" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">{stat.title}</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Blogs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Recent Published Blogs</h3>
            {data.recentBlogs.length === 0 && (
              <button
                onClick={() => window.location.href = '/admin/create-blog'}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                + Create New
              </button>
            )}
          </div>

          <div className="space-y-4">
            {data.recentBlogs && data.recentBlogs.length > 0 ? (
              data.recentBlogs.map((blog) => (
                <div key={blog._id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-slate-600 truncate mr-2">{blog.title}</span>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">Live</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="text-slate-300" />
                </div>
                <p className="text-sm text-slate-500 font-medium">Abhi koi blog publish nahi hua.</p>
                <p className="text-xs text-slate-400">Pahla blog likhna shuru karein!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;