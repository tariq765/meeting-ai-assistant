"use client";

import { useSession } from "@/lib/auth-client";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [geminiKey, setGeminiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account & AI Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your profile, Google Gemini AI API configuration, and integrations.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
          <span>✓</span> Settings saved successfully!
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>👤</span> Profile Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              readOnly
              value={session?.user?.name || "Ali Khan"}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              readOnly
              value={session?.user?.email || "ali@example.com"}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🤖</span> Google Gemini AI (FREE)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              100% Free API key from Google AI Studio (no credit card needed).
            </p>
          </div>
          <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
            FREE TIER ACTIVE
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">
              Don&apos;t have a key? Get one for free in 30 seconds at{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline"
              >
                aistudio.google.com
              </a>
            </p>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Save AI Settings
          </button>
        </form>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔗</span> Meeting Integrations
        </h2>
        <div className="space-y-3">
          {[
            { name: "Google Calendar", desc: "Auto-sync upcoming calls", icon: "📅", connected: true },
            { name: "Zoom Meeting Bot", desc: "Automatic recording bot join", icon: "📹", connected: true },
            { name: "HubSpot CRM", desc: "Sync meeting notes directly to deals", icon: "🟧", connected: false },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  item.connected
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.connected ? "Connected ✓" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
