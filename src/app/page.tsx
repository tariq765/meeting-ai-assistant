"use client";

import Link from "next/link";
import Script from "next/script";

const features = [
  {
    icon: "🎙️",
    title: "Auto Transcription",
    desc: "AI joins your Zoom/Google Meet and transcribes everything in real-time with 98% precision.",
  },
  {
    icon: "🧠",
    title: "Smart Summaries",
    desc: "Get concise executive summaries with key talking points instantly after every call.",
  },
  {
    icon: "✅",
    title: "Action Items & Deadlines",
    desc: "AI automatically extracts tasks, owners, and due dates directly from spoken conversation.",
  },
  {
    icon: "📧",
    title: "Automated Email Recaps",
    desc: "Summaries and action checklists are emailed to all attendees automatically within 60 seconds.",
  },
  {
    icon: "🔗",
    title: "CRM & Slack Sync",
    desc: "Seamlessly push meeting notes to HubSpot, Salesforce, Notion, or Slack channels.",
  },
  {
    icon: "🔒",
    title: "Enterprise Privacy",
    desc: "End-to-end encrypted transcript processing. Your proprietary discussions are never used to train models.",
  },
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "VP of Product, FinScale US",
    avatar: "SJ",
    text: "MeetingAI saves our executive team 3 hours every single day. It's like having a top-tier executive assistant in every call.",
  },
  {
    name: "Michael Chen",
    role: "Lead Engineer, DevCorp",
    avatar: "MC",
    text: "We haven't missed a single sprint action item since onboarding. The AI summaries are astonishingly sharp.",
  },
  {
    name: "Emma Watson",
    role: "Founder & CEO, Watson Growth",
    avatar: "EW",
    text: "Client follow-up speed went from 24 hours to 2 minutes. Our closing rate increased by 35%. Essential tool.",
  },
];

const faqs = [
  {
    q: "How does MeetingAI transcribe my meetings?",
    a: "MeetingAI integrates with Zoom, Google Meet, and Microsoft Teams. You can invite the bot to your scheduled calendar events or directly upload/paste meeting audio and notes for instant AI analysis.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! Every new user gets a 14-day unrestricted free trial. You do not even need to enter a credit card to get started.",
  },
  {
    q: "Are my company meetings kept private and secure?",
    a: "Absolutely. We adhere to enterprise-grade data security protocols. Your meeting audio and transcripts are encrypted in transit and at rest and are never sold or used for public AI training.",
  },
  {
    q: "What languages does MeetingAI support?",
    a: "Powered by Gemini AI, MeetingAI natively understands and summarizes conversations in English, Spanish, German, French, Urdu/Hindi, and 40+ other languages.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "Perfect for freelancers and solo professionals",
    features: [
      "15 meetings / month",
      "Gemini AI summaries",
      "Action item extraction",
      "Automated email recaps",
      "14-day free trial",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$79",
    desc: "For fast-scaling remote teams",
    features: [
      "Unlimited meetings",
      "Priority Gemini AI processing",
      "CRM & HubSpot sync",
      "Automated calendar bot",
      "Custom brand summaries",
      "Priority 24/7 support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    desc: "For organizations & agencies",
    features: [
      "Unlimited team seats",
      "Dedicated account manager",
      "SOC2 & GDPR exports",
      "Custom domain & SSO",
      "Direct API access",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MeetingAI",
    operatingSystem: "Web",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "29.00",
      priceCurrency: "USD",
    },
    description:
      "Automated AI meeting assistant that transcribes, generates executive summaries, and extracts action items from Zoom and Google Meet calls.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "840",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-500 selection:text-white">
      {/* Schema.org Structured Data for Google SEO */}
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-50">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            MeetingAI
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#features" className="hover:text-indigo-600 transition">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-indigo-600 transition">
            How It Works
          </Link>
          <Link href="#pricing" className="hover:text-indigo-600 transition">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-indigo-600 transition">
            FAQ
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
          >
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 pt-24 pb-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-indigo-100 shadow-xs">
          <span>✨</span> Powered by Google Gemini AI • 2026 Edition
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-950">
          Never Take Meeting{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Notes Again
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI joins your Zoom, Google Meet & Teams calls. Automatically extracts
          smart summaries, assigns action items, and emails everyone in seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-200"
          >
            Start 14-Day Free Trial 🎉
          </Link>
          <Link
            href="#how-it-works"
            className="w-full sm:w-auto text-gray-700 px-8 py-4 rounded-full text-base font-semibold border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition"
          >
            See How It Works →
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500">
          <span>✓ No credit card required</span>
          <span>✓ 60-second setup</span>
          <span>✓ Cancel anytime</span>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="bg-indigo-600 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white px-6">
          {[
            { value: "50,000+", label: "Meetings Summarized" },
            { value: "2.4 hrs", label: "Saved Per Employee / Day" },
            { value: "98.8%", label: "Transcription Accuracy" },
            { value: "4.9 / 5", label: "User Satisfaction" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-extrabold">{s.value}</div>
              <div className="text-indigo-200 text-xs md:text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Everything Your Team Needs To Stay Focused
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            From audio transcription to CRM synchronization, stop typing and start closing deals.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-7 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition group bg-white"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition transform origin-left">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="bg-gray-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-16">
            How MeetingAI Automates Your Post-Call Work
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: "📅",
                title: "Connect",
                desc: "Link Google Calendar or Outlook in 1 click.",
              },
              {
                step: "02",
                icon: "🤖",
                title: "Auto-Join",
                desc: "AI bot silently attends and records the conversation.",
              },
              {
                step: "03",
                icon: "🧠",
                title: "Analyze",
                desc: "Gemini AI extracts key decisions & action items.",
              },
              {
                step: "04",
                icon: "📧",
                title: "Deliver",
                desc: "Recap is dispatched instantly to all team members.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center"
              >
                <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
                  STEP {s.step}
                </div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Transparent Plans
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
          Simple Pricing for Solo Professionals & Teams
        </h2>
        <p className="text-gray-500 mb-16 max-w-lg mx-auto text-sm">
          Try any plan completely free for 14 days. Zero commitment.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`p-8 rounded-2xl border-2 transition ${
                p.highlight
                  ? "border-indigo-600 bg-white shadow-2xl scale-105 relative"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase bg-indigo-600 text-white px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
              <p className="text-xs text-gray-400 mb-6">{p.desc}</p>
              <div className="text-4xl font-extrabold text-gray-900 mb-6">
                {p.price}
                <span className="text-sm font-normal text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`block w-full py-3 rounded-xl text-center text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section id="faq" className="bg-gray-50 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              Everything You Need to Know
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs"
              >
                <h3 className="font-bold text-base text-gray-900 mb-2">{f.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ready to Reclaim 2+ Hours Every Day?
          </h2>
          <p className="text-indigo-100 mb-8 text-base">
            Join remote founders, project managers, and agencies automating their meeting workflows.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-base hover:bg-indigo-50 transition shadow-2xl"
          >
            Start Free Today — No Credit Card 🚀
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <span className="text-base font-bold text-white">MeetingAI</span>
            <span className="ml-2 text-gray-500">© 2026 MeetingAI. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="hover:text-white transition">Features</Link>
            <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="#faq" className="hover:text-white transition">FAQ</Link>
            <Link href="/login" className="hover:text-white transition">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
