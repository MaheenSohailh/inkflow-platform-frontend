import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
        
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-4 space-y-4">
          <div className="flex-shrink-0">
            {/* 🔥 Text aur Icon colors ko dark mode ke hisab se light kiya */}
            <Link to="/" className="flex items-center space-x-2 text-xl font-extrabold text-white tracking-tight group">
              {/* Modern Feather Pen SVG Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-indigo-400 transition-transform duration-300 group-hover:rotate-12"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
              <span>
                Ink<span className="text-indigo-400 font-medium">Flow</span>
              </span>
            </Link>
          </div>
          {/* 🔥 Description ko blogging platform ke mutabiq relevant kiya */}
          <p className="text-sm leading-relaxed max-w-xs text-slate-400">
            A modern blogging ecosystem designed for seamless content creation, safe transactions, and premium digital storytelling.
          </p>
        </div>
        
        {/* Product Links */}
        <div className="col-span-1 md:col-span-2 space-y-3 text-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Product</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Integrations</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Structure</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="col-span-1 md:col-span-2 space-y-3 text-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
            <li><Link to="/blogs" className="hover:text-white transition-colors">Blog Journal</Link></li>
            <li><a href="#guides" className="hover:text-white transition-colors">API Guides</a></li>
          </ul>    
        </div>

        {/* Newsletter Section */}
        <div className="col-span-2 md:col-span-4 space-y-3 text-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Subscribe to News</h4>
          <p className="text-xs text-slate-400">No spam. Only deep updates when premium content drops.</p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-2 max-w-sm">
            <input 
              type="email" 
              placeholder="you@domain.com" 
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2 w-full text-xs focus:outline-none focus:border-indigo-500" 
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shrink-0">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        {/* 🔥 Name changed to InkFlow */}
        <span>&copy; {new Date().getFullYear()} InkFlow Inc. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}