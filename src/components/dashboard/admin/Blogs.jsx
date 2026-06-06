import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck,
    Trash2,
    Edit3,
    Eye,
    DollarSign,
    Unlock,
    Lock,
    LayoutGrid,
    Crown,
    User,
    Ban
} from 'lucide-react';
import { getToken } from '../../../utils/auth';

const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Filters & Edit Modals ---
    const [filterType, setFilterType] = useState('all');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    // Form data states (Added selectedImage for file uploads)
    const [editFormData, setEditFormData] = useState({ title: '', content: '', isPaid: false, price: 0 });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [saveLoading, setSaveLoading] = useState(false);

    // --- Pagination States ---
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5);

    useEffect(() => {
        fetchAdminBlogs();
    }, []);

    const fetchAdminBlogs = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/blog/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success || response.data.status) {
                const data = response.data.blogs || response.data.blog || [];
                setBlogs(data);
            }
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
            alert("Error loading admin blogs panel");
        } finally {
            setLoading(false);
        }
    };

    // --- 1. Toggle Block / Unblock (Route Fixed with /admin prefix) ---
    const handleToggleBlock = async (blogId, currentStatus) => {
        try {
            const token = getToken();
            // Sahi path aapke backend ke mutabiq
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/blog/toggle-block/${blogId}`,
                { isBlocked: !currentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success || response.data.status) {
                setBlogs(blogs.map(blog =>
                    blog._id === blogId ? { ...blog, isBlocked: !currentStatus } : blog
                ));
                alert("Status updated successfully! 🎉");
            }
        } catch (error) {
            console.error("Block error:", error.response?.data);
            alert(error.response?.data?.message || "Block action failed.");
        }
    };

    // --- 2. Delete Blog Handler (Route Fixed with /admin prefix) ---
    const handleDeleteBlog = async (blogId) => {
        if (!window.confirm("Are you absolutely sure you want to delete this blog post?")) return;

        try {
            const token = getToken();
            // Sahi path: /blog/delete/:id
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/blog/delete/${blogId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success || response.data.status) {
                alert("Blog deleted successfully! 🗑️");
                setBlogs(blogs.filter(blog => blog._id !== blogId));
            }
        } catch (error) {
            console.error("Delete error:", error.response?.data);
            alert(error.response?.data?.message || "Failed to delete the blog");
        }
    };

    // --- 3. Open Edit Modal Setup ---
    const openEditModal = (blog) => {
        setEditingBlog(blog);
        setEditFormData({
            title: blog.title,
            content: blog.content,
            isPaid: blog.isPaid === 'true' || blog.isPaid === true,
            price: blog.price || 0
        });
        setImagePreview(blog.image || ''); // Current image preview set
        setSelectedImage(null); // Clear any previously selected file
        setIsEditModalOpen(true);
    };

    // Handle Image Selection change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file)); // Show new selected image preview instantly
        }
    };

    // --- 4. Handle Edit Form Save Changes (Converted to FormData) ---
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        try {
            const token = getToken();
            const formData = new FormData();

            formData.append('title', editFormData.title);
            formData.append('content', editFormData.content);
            formData.append('isPaid', editFormData.isPaid);
            formData.append('price', editFormData.isPaid ? Number(editFormData.price) : 0);

            // 🔥 CRITICAL FIX: Key ka naam exact 'image' hona chahiye jo backend par upload.single('image') se match kare
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/blog/update/${editingBlog._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success || response.data.status) {
                alert("Blog updated with image! ✅");
                fetchAdminBlogs(); // Data refresh karne ke liye
                setIsEditModalOpen(false);
            }
        } catch (error) {
            console.error("Update Error:", error.response?.data);
            alert(error.response?.data?.message || "Failed to update blog");
        } finally {
            setSaveLoading(false);
        }
    };

    // --- Filters & Counters Logic ---
    const filteredBlogs = blogs.filter(blog => {
        if (filterType === 'paid') return blog.isPaid === true || blog.isPaid === 'true';
        if (filterType === 'free') return !blog.isPaid || blog.isPaid === 'false';
        if (filterType === 'blocked') return blog.isBlocked === true || blog.isBlocked === 'true';
        return true;
    });

    const totalPaid = blogs.filter(b => b.isPaid === true || b.isPaid === 'true').length;
    const totalFree = blogs.filter(b => !b.isPaid || b.isPaid === 'false').length;
    const totalBlocked = blogs.filter(b => b.isBlocked === true || b.isBlocked === 'true').length;

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">



                {/* Header Profile Dashboard */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-start md:items-center gap-4">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <ShieldCheck className="text-indigo-600" /> Admin Core Dashboard
                            </h1>
                            <p className="text-xs text-slate-500 mt-1">Manage blog settings, authorization, and content visibility.</p>
                        </div>
                    </div>

                    {/* Status Counters - Mobile par grid ka use karein taake layout na phate */}
                    <div className="grid grid-cols-2 md:flex gap-2">
                        <span className="flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-bold px-2 py-2 rounded-xl border border-slate-200">
                            <LayoutGrid size={12} /> Total: {blogs.length}
                        </span>
                        <span className="flex items-center justify-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] sm:text-xs font-bold px-2 py-2 rounded-xl border border-amber-200">
                            <DollarSign size={12} /> Paid: {totalPaid}
                        </span>
                        <span className="flex items-center justify-center gap-1.5 bg-indigo-50 text-indigo-700 text-[10px] sm:text-xs font-bold px-2 py-2 rounded-xl border border-indigo-200">
                            <Unlock size={12} /> Free: {totalFree}
                        </span>
                        <span className="flex items-center justify-center gap-1.5 bg-rose-50 text-rose-700 text-[10px] sm:text-xs font-bold px-2 py-2 rounded-xl border border-rose-200">
                            <Lock size={12} /> Blocked: {totalBlocked}
                        </span>
                    </div>
                </div>

                {/* Filter Controls tabs - Native Horizontal Scroll */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
                    {[
                        { id: 'all', label: 'All', icon: <LayoutGrid size={14} /> },
                        { id: 'paid', label: 'Paid', icon: <DollarSign size={14} /> },
                        { id: 'free', label: 'Free', icon: <Unlock size={14} /> },
                        { id: 'blocked', label: 'Blocked', icon: <Ban size={14} /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setFilterType(tab.id); setCurrentPage(1); }}
                            className={`flex items-center gap-2 px-3 py-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap 
          ${filterType === tab.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Core Data Table View */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-scroll lg:overflow-x-hidden">
                    <div className="w-86 lg:w-full">
                        <table className="text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs uppercase font-bold tracking-wider">
                                    <th className="px-6 py-4">Cover / Title & Details</th>
                                    <th className="px-6 py-4">Author Profile</th>
                                    <th className="px-6 py-4">Access Tier</th>
                                    <th className="px-6 py-4">Status Flag</th>
                                    <th className="px-6 py-4 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {currentBlogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center font-medium text-slate-400 bg-white">
                                            No database entries found matching the parameters.
                                        </td>
                                    </tr>
                                ) : (
                                    currentBlogs.map((blog) => (
                                        <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">

                                            <td className="px-6 py-4 ">
                                                <div className="flex items-center space-x-3">
                                                    <img src={blog.image} alt="image" className="w-12 h-12 rounded-lg object-cover bg-slate-50 border flex-shrink-0" />
                                                    <div className="max-w-x sm:max-w-md">
                                                        <div className="font-semibold text-slate-900 line-clamp-1">{blog.title}</div>
                                                        <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">{blog.content}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="font-medium text-slate-800 block text-xs">{blog.author?.name || "Unknown Author"}</span>
                                                <span className="text-[11px] text-slate-400 block mt-0.5">{blog.author?.email || "No registry email"}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                {blog.isPaid === true || blog.isPaid === 'true' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
                                                        <Crown size={14} /> Premium (${blog.price})
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                                                        <User size={14} /> Standard (Free)
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                <label className="inline-flex items-center cursor-pointer relative select-none">
                                                    <input
                                                        type="checkbox"
                                                        checked={!blog.isBlocked}
                                                        onChange={() => handleToggleBlock(blog._id, blog.isBlocked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-9 h-5 bg-rose-500 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                                    <span className="text-xs font-bold ml-2 text-slate-600 min-w-[50px]">
                                                        {blog.isBlocked ? "Blocked" : "Live"}
                                                    </span>
                                                </label>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/admin/blog/${blog._id}`)}
                                                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                                                        title="View Details"
                                                    >
                                                        <Eye size={18} />
                                                    </button>

                                                    <button
                                                        onClick={() => openEditModal(blog)}
                                                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                                                        title="Edit Content"
                                                    >
                                                        <Edit3 size={18} />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDeleteBlog(blog._id)}
                                                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                                                        title="Delete Permanently"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer Elements */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">
                                Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} logs
                            </span>
                            <div className="inline-flex space-x-1">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* === EDIT MODAL POPUP (With Image Upload Feature) === */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-xl relative flex flex-col max-h-[90vh]">

                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <h3 className="text-lg font-bold text-slate-900">✏️ Edit System Blog</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl cursor-pointer">✕</button>
                        </div>

                        <form onSubmit={handleSaveChanges} className="space-y-4 overflow-y-auto flex-1 pr-1" encType="multipart/form-data">

                            {/* 🖼️ Image Selection and Preview Fields */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cover Image</label>
                                <div className="flex items-center space-x-4 bg-slate-50 p-3 rounded-2xl border border-dashed border-slate-200">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-16 h-16 rounded-xl object-cover bg-white border shadow-sm flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-1">Leave empty if you don't want to modify the current image.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Title</label>
                                <input
                                    type="text" required
                                    value={editFormData.title}
                                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-indigo-600"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Content</label>
                                <textarea
                                    rows="4" required
                                    value={editFormData.content}
                                    onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:border-indigo-600 resize-none"
                                />
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl space-y-3 border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-slate-700 block">Premium Locked Content</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={editFormData.isPaid}
                                        onChange={(e) => setEditFormData({ ...editFormData, isPaid: e.target.checked })}
                                        className="w-4 h-4 cursor-pointer accent-indigo-600"
                                    />
                                </div>

                                {editFormData.isPaid && (
                                    <div className="pt-2 border-t flex items-center justify-between gap-4">
                                        <span className="text-xs font-bold text-slate-500">Price Tier ($):</span>
                                        <input
                                            type="number" min="0" required
                                            value={editFormData.price}
                                            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                                            className="w-28 px-3 py-1 border rounded-lg text-sm text-right font-bold"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg cursor-pointer">Cancel</button>
                                <button type="submit" disabled={saveLoading} className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg cursor-pointer">
                                    {saveLoading ? 'Uploading & Saving...' : 'Save Updates'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

        </div>

    );
};

export default Blogs;