import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import axios from "axios";

const AuthForm = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "user",
        adminSecretKey: "" // Added secret key to initial state
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Quick Test Fill Helper
    const handleQuickFill = (role) => {
        if (role === 'admin') {
            setFormData({
                email: "admin@gmail.com",
                password: "adminpassword",
                role: "admin",
                adminSecretKey: "03190322055bts7" //  Pass key automatically in quick test
            });
        } else {
            setFormData({
                email: "user@gmail.com",
                password: "userpassword",
                role: "user",
                adminSecretKey: ""
            });
        }
    };

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        try {
            // Login ke waqt sirf email aur password chahiye hota hai
            const loginPayload = { email: formData.email, password: formData.password };
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, loginPayload);

            if (data.success) {
                setUser(data.user);
                setToken(data.token);

                setFormData({ email: "", password: "", role: "user", adminSecretKey: "" });

                // Redirect based on role
                if (data.user && data.user.role?.toLowerCase() === 'admin') {
                    alert("👋 Welcome Admin! Redirecting to Admin Dashboard...");
                    navigate("/admin/dashboard");
                } else {
                    alert("👋 Welcome Back! Redirecting to Your Dashboard...");
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            console.log('SignIn ERROR: ', error.message);
            alert("Login failed! Please check your credentials.");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            //  Pure formData ke sath adminSecretKey bhi automatic backend par jayega
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, formData);

            if (data.success) {
                setUser(data.user);
                setToken(data.token);
                setFormData({ email: "", password: "", role: "user", adminSecretKey: "" });

                alert(`🎉 Account created successfully as ${data.user.role}!`);

                if (data.user && data.user.role?.toLowerCase() === 'admin') {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/dashboard"); //  Direct user to user dashboard layout instead of home
                }
            } else {
                alert(`⚠️ ${data.message}`);
            }
        } catch (error) {
            console.log('Signup ERROR: ', error);
            const serverMessage = error.response?.data?.message || "Something went wrong during signup.";
            alert(`❌ Signup failed: ${serverMessage}`);
        }
    };

    const handleSubmit = (e) => {
        if (activeTab === "login") {
            handleLogin(e);
        } else {
            handleSignup(e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">

                {/* Quick Test Accounts */}
                <div className="border border-dashed border-purple-200 rounded-xl p-3 bg-indigo-50/50 text-center space-y-2">
                    <p className="text-xs font-bold text-indigo-500 tracking-wide uppercase">⚡ Quick Test Account Fill</p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleQuickFill('user')}
                            className="bg-white text-slate-700 border border-slate-200 py-1.5 px-3 rounded-lg text-xs font-semibold hover:border-purple-500 hover:text-purple-600 transition-all shadow-sm"
                        >
                            🧑 User Data
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickFill('admin')}
                            className="bg-slate-900 text-white py-1.5 px-3 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm"
                        >
                            👑 Admin Data
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className={`w-1/2 py-2 rounded-lg font-medium transition ${activeTab === "login" ? "bg-indigo-500 text-white shadow-sm" : "text-gray-600"}`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("signup")}
                        className={`w-1/2 py-2 rounded-lg font-medium transition ${activeTab === "signup" ? "bg-indigo-500 text-white shadow-sm" : "text-gray-600"}`}
                    >
                        Signup
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    />

                    {/* DYNAMIC ROLE DROPDOWN & SECRET KEY FIELD */}
                    {activeTab === "signup" && (
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 px-1">Select Account Type:</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                >
                                    <option value="user">Standard User 🧑</option>
                                    <option value="admin">Administrator 👑</option>
                                </select>
                            </div>

                            {/*  SECRET KEY INPUT FIELD: Target text matching backend key */}
                            {formData.role === "admin" && (
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-red-500 px-1">Enter Admin Secret Key 🤫:</label>
                                    <input
                                        type="password"
                                        name="adminSecretKey"
                                        placeholder="Enter Secret Code"
                                        onChange={handleChange}
                                        required={formData.role === "admin"}
                                        className="w-full border border-red-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 transition-all bg-red-50/30"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "login" && (
                        <div className="flex justify-end">
                            <Link className="text-sm font-medium text-indigo-500 hover:text-indigo-400 transition-colors" to={"/forgot-password"}>
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 font-semibold shadow-md shadow-purple-100 transition active:scale-[0.99]"
                    >
                        {activeTab === "login" ? "Login" : "Signup"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;