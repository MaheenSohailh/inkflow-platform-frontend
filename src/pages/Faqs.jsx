import React, { useState} from 'react';

const FAQS = [
  {
    q: "How simple is the onboarding integration process?",
    a: "Extremely simple. We provide plug-and-play SDKs for popular frameworks like React, Next.js, and Vue, alongside comprehensive documentation to get you deployed in under an hour."
  },
  {
    q: "Can I migrate my current database stack onto your ecosystem?",
    a: "Yes. Our cloud synchronization services natively support safe data pipelines from MongoDB, PostgreSQL, and Firebase with zero downtime transitions."
  },
  {
    q: "Is there built-in analytics tracking for my blogs?",
    a: "Absolutely. Every dashboard includes real-time user engagement monitoring, reading metrics, view counts, and customizable notification triggers for content creators."
  },
  {
    q: "What is the difference between a Standard User and an Administrator?",
    a: "Standard Users can read blogs, purchase premium content, and manage their own profiles. Administrators have full system access, including global content moderation, platform analytics, payment logs, and user role management."
  },
  {
    q: "How do paid/premium blogs work on the platform?",
    a: "Content creators or admins can lock specific blogs behind a paywall. Standard users can seamlessly purchase access via our integrated secure payment gateways, unlocking the content instantly forever."
  },
  {
    q: "Are the payment transactions secure?",
    a: "Yes, 100%. We utilize fully encrypted SSL communication, and all payments are handled natively through top-tier certified processors like Stripe or PayPal. We never store your raw card details on our servers."
  },
  {
    q: "What happens if a payment fails but my account gets debited?",
    a: "Don't worry. In case of an intermittent network dropout, our webhooks automatically reconcile stuck payments within 15 minutes. If it fails completely, the automated system triggers a reversal to your bank instantly."
  },
  {
    q: "Can I reset my password if I lose access to my account?",
    a: "Yes, you can use the 'Forgot Password' option on the authentication screen. An automated secure, token-based link will be dispatched to your registered email address to let you configure a new password safely."
  }
];

export default function FAQsPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section id="faq" className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 min-h-[70vh]">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg">
          Quick answers to common inquiries regarding subscription management, security standards, paid blogging structures, and technical setup features.
        </p>
      </div>

      {/* Accordion FAQs List */}
      <div className="space-y-4 mb-16">
        {FAQS.map((faq, idx) => {
          const isOpen = activeFaq === idx;
          return (
            <div
              key={idx}
              className={`bg-white border rounded-xl shadow-sm transition-all duration-200 overflow-hidden ${isOpen ? 'border-indigo-300 ring-1 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'
                }`}
            >
              <button
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 focus:outline-none group select-none"
              >
                <span className={`pr-4 transition-colors duration-200 ${isOpen ? 'text-indigo-600' : 'group-hover:text-indigo-600'}`}>
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out text-slate-600 text-sm sm:text-base ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/40">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔥 NEW CTA CARD: Still Have Questions? */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white shadow-md relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center bg-white/20 p-2.5 rounded-full backdrop-blur-md mb-2">
            💬
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Still have unanswered questions?
          </h3>
          <p className="text-indigo-100 text-sm sm:text-base">
            Can't find the answer you're looking for? Please reach out to our dedicated support team, and we will get back to you within a few hours.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => window.location.href = 'mailto:support@yourdomain.com'}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-indigo-600 font-semibold text-sm rounded-xl shadow-md hover:bg-indigo-50 active:scale-[0.98] transition-all"
            >
              Contact Support
            </button>
            <button
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600/30 text-white font-semibold text-sm rounded-xl border border-white/20 hover:bg-indigo-600/50 active:scale-[0.98] transition-all"
            >
              Documentation
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}