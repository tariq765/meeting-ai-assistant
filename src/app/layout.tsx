import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://meetingai.vercel.app"),
  title: {
    default: "MeetingAI — Free AI Meeting Assistant & Smart Notes Generator",
    template: "%s | MeetingAI",
  },
  description:
    "Automatically transcribe, summarize, and extract action items from Zoom, Google Meet, and Microsoft Teams meetings with Google Gemini AI. Save 2+ hours daily.",
  keywords: [
    "AI meeting assistant",
    "free meeting notes summarizer",
    "zoom meeting transcript AI",
    "automatic action items extractor",
    "google meet notes AI",
    "AI meeting minutes generator",
    "remote work productivity tool",
    "transcribe zoom meeting free",
  ],
  authors: [{ name: "MeetingAI Team" }],
  creator: "MeetingAI",
  publisher: "MeetingAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meetingai.vercel.app",
    title: "MeetingAI — Never Take Meeting Notes Again",
    description:
      "Transform hour-long Zoom & Google Meet calls into 3-minute executive summaries and actionable tasks with Gemini AI.",
    siteName: "MeetingAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetingAI — AI-Powered Meeting Notes & Summaries",
    description:
      "Save 2 hours every day on meeting notes. Powered by Gemini AI. Free trial.",
    creator: "@MeetingAI",
  },
  alternates: {
    canonical: "https://meetingai.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
