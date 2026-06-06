import React from 'react';
import { Zap, Palette, RefreshCw } from 'lucide-react';

// --- DATA CONSTANTS --- //
const SERVICES = [
  { 
    id: 1, 
    icon: <Zap className="w-8 h-8" />, 
    title: 'Ultra-Fast Performance', 
    desc: 'Optimized build systems ensuring lightning-fast loading speeds and unmatched SEO efficiency.' 
  },
  { 
    id: 2, 
    icon: <Palette className="w-8 h-8" />, 
    title: 'Stunning Creative Design', 
    desc: 'Crafting visually immersive, high-conversion interfaces tailored precisely to your brand guidelines.' 
  },
  { 
    id: 3, 
    icon: <RefreshCw className="w-8 h-8" />, 
    title: 'Seamless System Sync', 
    desc: 'Robust infrastructure designed to bridge databases, APIs, and modern front-ends smoothly.' 
  },
];

const METRICS = [
  { value: "99.9%", label: "Platform Uptime" },
  { value: "25M+", label: "API Requests Managed" },
  { value: "120+", label: "Global Enterprise Clients" },
];

const TESTIMONIALS = [
  {
    quote: "This platform completely revolutionized how our design and engineering teams collaborate. Production speeds went up by almost 40%.",
    author: "Sarah Jenkins",
    role: "VP of Product, CloudScale",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    quote: "The attention to clean UI details and robust architecture is exceptional. It handles our heaviest analytical workflows without breaking a sweat.",
    author: "Marcus Chen",
    role: "Chief Technology Officer, CoreData",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
  }
];

const ARTICLES = [
  { id: 1, category: "Engineering", title: "Optimizing Micro-Frontends for Next-Gen Scale", date: "May 18, 2026", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" },
  { id: 2, category: "Design Systems", title: "The Psychology of Fluid Motion in Modern SaaS Interfaces", date: "May 12, 2026", img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80" }
];

export default function HomePage() {
  return (
    <div className="bg-slate-50 font-sans antialiased text-slate-800 selection:bg-indigo-500 selection:text-white overflow-x-hidden">

      {/* === HERO SECTION ===*/}
      <section className="relative pt-20 pb-20 md:pb-32 overflow-hidden bg-white">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/70 blur-3xl -z-10" />
        <div className="absolute bottom-[0%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-50/70 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 text-center md:text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
              ✨ Next Generation Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Build stunning apps <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">with absolute fluid scale.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Empower your dynamic ecosystem with automated infrastructure, precise styling layers, and optimized speed workflows. Scale seamlessly without friction.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button className="w-full sm:w-auto px-8 py-4 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xl shadow-indigo-200 transition-all hover:-translate-y-0.5 active:scale-95">
                Launch Dashboard
              </button>
              <button className="w-full sm:w-auto px-8 py-4 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                Documentation <span>→</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="relative mx-auto max-w-[400px] md:max-w-none bg-gradient-to-br from-indigo-100 to-violet-100 p-4 rounded-3xl border border-white/60 shadow-2xl shadow-slate-200/80 aspect-square flex items-center justify-center group">
              <div className="absolute inset-4 bg-white rounded-2xl shadow-inner p-6 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">Live Analytics</span>
                </div>
                <div className="space-y-3 my-auto">
                  <div className="h-4 bg-slate-100 rounded-md w-2/3 animate-pulse" />
                  <div className="h-8 bg-indigo-600/10 rounded-md w-full flex items-center px-3">
                    <div className="h-2 bg-indigo-600 rounded w-1/2" />
                  </div>
                  <div className="h-4 bg-slate-100 rounded-md w-4/5 animate-pulse" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  <span>System Capacity</span>
                  <span className="text-emerald-600 font-mono">Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== METRICS SECTION ==== */}
      <section className="bg-slate-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-8 text-center">
          {METRICS.map((metric, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-300">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-slate-400 tracking-wide uppercase">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==== SERVICES SECTION ==== */}
      <section id="services" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-600">Core Architecture</h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Engineered for absolute performance.</p>
          <p className="text-slate-600 text-lg">We remove deployment friction so your teams can build, test, and safely deploy intuitive features rapidly.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map(srv => (
            <div key={srv.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 text-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  {srv.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{srv.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{srv.desc}</p>
              </div>
              <a href="#learn" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ==== */}
      <section id="features" className="py-20 md:py-28 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
              <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-600">User Reviews</h2>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">Trusted by global builders.</p>
              <p className="text-slate-600 text-base">Hear directly from creative directors, tech founders, and operational leads utilizing our modern infrastructure layouts daily.</p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                  <p className="text-slate-600 italic leading-relaxed text-sm sm:text-base">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.img} alt={t.author} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{t.author}</h4>
                      <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section id="blog" className="py-20 md:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-xs uppercase tracking-widest font-bold text-indigo-600">Company Insights</h2>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">Latest from our journal.</p>
            </div>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0">
              View all insights <span>→</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ARTICLES.map(art => (
              <div key={art.id} className="group cursor-pointer space-y-4">
                <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10] border border-slate-200 relative">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">{art.category}</span>
                    <span className="text-slate-400 font-mono">{art.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {art.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CALL TO ACTION === */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-3xl text-white px-6 py-12 sm:p-16 text-center space-y-6 overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to accelerate your product scaling pipelines?
          </h2>
          <p className="text-indigo-100 text-lg max-w-xl mx-auto leading-relaxed">
            Join thousands of modern technical teams building and operating cross-functional apps securely. Set up your sandbox token instantly.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-md hover:bg-indigo-50 transition-colors active:scale-95">
              Create Free Account
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-white/40 hover:border-white/80 bg-white/5 font-semibold rounded-xl transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}