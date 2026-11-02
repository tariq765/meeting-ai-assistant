"use client";

import { useEffect, useState } from "react";

interface Meeting {
  id: string;
  title: string;
  platform: string;
  duration: number | null;
  summary: string | null;
  actionItems: string[] | null;
  decisions: string[] | null;
  transcript: string | null;
  createdAt: string;
}

const sampleTranscripts = [
  {
    title: "Q4 Product Strategy & Mobile Launch",
    platform: "Zoom",
    transcript: `John: Hi everyone, thanks for joining today. Let's discuss our mobile app release scheduled for December.
Sarah: I reviewed the Figma prototypes. The authentication and checkout flows look solid. We just need backend API endpoints for Stripe integration.
Ali: I am currently setting up the Neon PostgreSQL database and Better Auth. I will finish the Stripe webhook endpoints by this Friday.
John: Great. Sarah, can you finalize the UI assets by Wednesday? And Ali, make sure we have staging environment tested before next Monday.
Sarah: Yes, Wednesday is doable.
John: Agreed. So decision is: we launch beta on Dec 15th, and stick with Next.js 16 + Tailwind CSS. Let's reconvene on Friday.`,
  },
];

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Zoom");
  const [transcript, setTranscript] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchMeetings = async () => {
    try {
      const res = await fetch("/api/meetings");
      if (res.ok) {
        const data = await res.json();
        setMeetings(data.meetings || []);
        if (data.meetings?.length > 0 && !selectedMeeting) {
          setSelectedMeeting(data.meetings[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, platform, transcript }),
      });

      if (res.ok) {
        const data = await res.json();
        setMeetings((prev) => [data.meeting, ...prev]);
        setSelectedMeeting(data.meeting);
        setIsModalOpen(false);
        setTitle("");
        setTranscript("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const loadSample = () => {
    const s = sampleTranscripts[0];
    setTitle(s.title);
    setPlatform(s.platform);
    setTranscript(s.transcript);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meetings & AI Notes</h1>
          <p className="text-gray-500 mt-1">
            Transcribe calls, extract summaries, and track actionable tasks.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-sm"
        >
          <span>✨</span> Process New Meeting
        </button>
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
          Loading your meetings...
        </div>
      ) : meetings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="text-5xl mb-4">🎙️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No meetings yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Upload or paste your first meeting transcript to see Google Gemini AI summarize key points, tasks, and decisions.
          </p>
          <button
            onClick={() => {
              loadSample();
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Try With Sample Meeting 🚀
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              All Recordings ({meetings.length})
            </h2>
            <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
              {meetings.map((m) => {
                const isSelected = selectedMeeting?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMeeting(m)}
                    className={`p-4 rounded-xl border cursor-pointer transition text-left ${
                      isSelected
                        ? "bg-indigo-50/70 border-indigo-300 shadow-sm"
                        : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                        {m.platform}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
                      {m.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {m.summary || "Summary generated"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Detail Pane (7 cols) */}
          <div className="lg:col-span-7">
            {selectedMeeting ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
                {/* Header */}
                <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full">
                        ✓ AI Processed
                      </span>
                      <span className="text-xs text-gray-400">
                        {selectedMeeting.duration || 15} mins duration
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedMeeting.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      if (selectedMeeting.summary) {
                        navigator.clipboard.writeText(selectedMeeting.summary);
                        alert("AI Summary copied to clipboard! 📋");
                      }
                    }}
                    className="text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition self-start sm:self-auto"
                  >
                    📋 Copy Summary
                  </button>
                </div>

                {/* AI Executive Summary */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <span>🧠</span> Executive Summary
                  </h3>
                  <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/30 p-4 rounded-xl border border-indigo-100 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedMeeting.summary || "No summary available."}
                  </div>
                </div>

                {/* Action Items */}
                {selectedMeeting.actionItems && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span>✅</span> Action Items & Next Steps
                    </h3>
                    <div className="space-y-2">
                      {(selectedMeeting.actionItems as string[]).map(
                        (item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700"
                          >
                            <input
                              type="checkbox"
                              defaultChecked={idx === 0}
                              className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="flex-1">{item}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Decisions */}
                {selectedMeeting.decisions && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <span>🎯</span> Key Decisions Agreed Upon
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 bg-yellow-50/50 p-4 rounded-xl border border-yellow-100">
                      {(selectedMeeting.decisions as string[]).map(
                        (dec, idx) => (
                          <li key={idx}>{dec}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Transcript */}
                <div>
                  <details className="group">
                    <summary className="text-xs font-semibold text-gray-500 cursor-pointer hover:text-indigo-600 flex items-center gap-1 select-none">
                      <span>📜 View Full Transcript</span>
                    </summary>
                    <div className="mt-2 p-4 bg-gray-50 rounded-xl text-xs text-gray-600 font-mono whitespace-pre-line max-h-60 overflow-y-auto">
                      {selectedMeeting.transcript}
                    </div>
                  </details>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl border border-gray-200/60 p-12 text-center text-gray-400">
                Select a meeting from the list to view insights
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Creating New Meeting */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>✨</span> Process New Meeting
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Meeting Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Weekly Product Sync"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Zoom">Zoom 📹</option>
                  <option value="Google Meet">Google Meet 📞</option>
                  <option value="Microsoft Teams">Microsoft Teams 💬</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">
                    Transcript / Discussion Notes
                  </label>
                  <button
                    type="button"
                    onClick={loadSample}
                    className="text-xs text-indigo-600 hover:underline font-medium"
                  >
                    Load Sample Script ⚡
                  </button>
                </div>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Paste dialogue, transcription or meeting conversation here..."
                  rows={6}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {creating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating AI Summary...
                    </>
                  ) : (
                    "Run AI Analysis 🚀"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
