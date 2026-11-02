import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "Perfect for freelancers and solo professionals",
    features: [
      "15 meetings per month",
      "Google Gemini AI summarization",
      "Automated action item extraction",
      "Full transcripts storage",
      "14-day free trial",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$79",
    desc: "For fast-moving founders and growing teams",
    features: [
      "Unlimited meetings",
      "Priority Gemini AI processing",
      "CRM sync (HubSpot, Salesforce)",
      "Calendar auto-join bot",
      "Custom company branding",
      "Priority email support",
    ],
    highlight: true,
  },
  {
    name: "Agency / Enterprise",
    price: "$199",
    desc: "For multi-client agencies and enterprises",
    features: [
      "Unlimited seats & workspaces",
      "Dedicated account manager",
      "Custom AI models & vocabulary",
      "SOC2 & GDPR compliance export",
      "Direct API access",
    ],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <Link
          href="/dashboard"
          className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full inline-block mb-6 hover:bg-indigo-100"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Predictable Pricing for High-Performance Teams
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Start your 14-day free trial. Cancel anytime with a single click.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-8 border-2 transition ${
                p.highlight
                  ? "border-indigo-600 bg-white shadow-xl scale-105"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              {p.highlight && (
                <span className="text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
              <p className="text-xs text-gray-400 mt-1 mb-6">{p.desc}</p>
              <div className="text-4xl font-extrabold text-gray-900 mb-6">
                {p.price}
                <span className="text-sm font-normal text-gray-400">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="text-xs text-gray-600 flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className={`block w-full py-3 rounded-xl text-center text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Choose {p.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
