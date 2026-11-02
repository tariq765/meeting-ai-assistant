"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const stats = [
  { label: "Total Meetings", value: "0", icon: "🎙️", color: "bg-indigo-50 text-indigo-600" },
  { label: "Hours Saved", value: "0h", icon: "⏱️", color: "bg-green-50 text-green-600" },
  { label: "Action Items", value: "0", icon: "✅", color: "bg-yellow-50 text-yellow-600" },
  { label: "This Month", value: "$0", icon: "💰", color: "bg-purple-50 text-purple-600" },
];

const recentMeetings = [
  {
    id: "1",
    title: "Product Roadmap Q4",
    platform: "Zoom",
    duration: "45 min",
    date: "Today, 10:00 AM",
    status: "completed",
    actionItems: 4,
  },
  {
    id: "2",
    title: "Client Onboarding — Acme Corp",
    platform: "Google Meet",
    duration: "30 min",
    date: "Yesterday, 2:00 PM",
    status: "completed",
    actionItems: 2,
  },
  {
    id: "3",
    title: "Weekly Team Standup",
    platform: "Zoom",
    duration: "15 min",
    date: "Nov 1, 9:00 AM",
    status: "completed",
    actionItems: 6,
  },
];

const platformIcon = (p: string) => {
  if (p === "Zoom") return "📹";
  if (p === "Google Meet") return "📞";
  return "💬";
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good day, {firstName}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here&apos;s what&apos;s happening with your meetings.
          </p>
        </div>
        <Link
          href="/meetings"
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
        >
          <span>+</span> New Meeting
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Meetings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Meetings</h2>
            <Link href="/meetings" className="text-sm text-indigo-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentMeetings.map((m) => (
              <div key={m.id} className="p-5 flex items-center gap-4 hover:bg-gray-50 transition">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">
                  {platformIcon(m.platform)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{m.title}</p>
                  <p className="text-sm text-gray-400">{m.date} · {m.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-medium">
                    ✓ {m.actionItems} tasks
                  </span>
                </div>
              </div>
            ))}
            {recentMeetings.length === 0 && (
              <div className="p-12 text-center text-gray-400">
                <div className="text-4xl mb-3">🎙️</div>
                <p>No meetings yet. Start your first one!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions + Plan */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { icon: "🎙️", label: "Start New Meeting", href: "/meetings" },
                { icon: "📅", label: "Connect Calendar", href: "/settings" },
                { icon: "🔗", label: "Connect CRM", href: "/settings" },
                { icon: "👥", label: "Invite Team", href: "/settings" },
              ].map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition text-sm text-gray-600 font-medium"
                >
                  <span>{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Plan Badge */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-5 text-white">
            <div className="text-sm font-medium text-indigo-200 mb-1">Current Plan</div>
            <div className="text-2xl font-bold mb-1">Free Trial</div>
            <div className="text-indigo-200 text-sm mb-4">14 days remaining</div>
            <Link
              href="/pricing"
              className="block w-full bg-white text-indigo-600 text-sm font-semibold py-2 rounded-xl text-center hover:bg-indigo-50 transition"
            >
              Upgrade to Pro 🚀
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
