"use client";

import { useState, useCallback } from "react";

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

const IconStar = ({ filled = true, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#FBBF24" : "none"}
    stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconCopy = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconExternalLink = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconCheck = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconChevronRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconChevronLeft = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconEdit = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconRefresh = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_TAGS = [
  { id: "patient",      emoji: "😌", label: "Incredibly Patient" },
  { id: "first_time",   emoji: "🎉", label: "Passed First Time!" },
  { id: "nervous",      emoji: "🧘", label: "Great for Nervous Drivers" },
  { id: "calm",         emoji: "🕊️", label: "Calm & Reassuring" },
  { id: "explain",      emoji: "📖", label: "Explains Everything Clearly" },
  { id: "flexible",     emoji: "🗓️", label: "Very Flexible Scheduling" },
  { id: "confidence",   emoji: "💪", label: "Boosted My Confidence" },
  { id: "professional", emoji: "🎓", label: "Highly Professional" },
  { id: "recommend",    emoji: "🌟", label: "Would Highly Recommend" },
  { id: "value",        emoji: "💷", label: "Great Value for Money" },
  { id: "theory",       emoji: "📝", label: "Helped With My Theory Too" },
  { id: "fast",         emoji: "🚀", label: "Progressed Quickly" },
];

// ─── Review Generator ─────────────────────────────────────────────────────────

function buildReview(pupilName, instructorName, tags) {
  const name = pupilName.trim() || "I";
  const tagLabels = tags.map(t => t.label.replace(/!$/, "").toLowerCase());

  const openers = [
    `${name} recently passed my driving test with ${instructorName} and honestly couldn't be more pleased!`,
    `After passing my driving test first time with ${instructorName}, I had to leave this review!`,
    `${name} just passed with ${instructorName} and wanted to share my experience.`,
  ];
  const opener = openers[Math.floor(Math.random() * openers.length)];

  let body = "";
  if (tagLabels.length > 0) {
    const joined = tagLabels.length === 1
      ? tagLabels[0]
      : tagLabels.slice(0, -1).join(", ") + " and " + tagLabels[tagLabels.length - 1];
    body = ` ${instructorName} was ${joined} — everything you'd want in an instructor.`;
  }

  const closers = [
    ` From the very first lesson to test day, ${instructorName} made the whole journey enjoyable. Couldn't recommend more highly — 5 stars! ⭐⭐⭐⭐⭐`,
    ` Every lesson felt productive and I always left feeling more confident. If you're looking for a driving instructor in the area, look no further. 5 stars! ⭐⭐⭐⭐⭐`,
    ` The structured lessons and genuine support made all the difference. Thank you so much, ${instructorName}! ⭐⭐⭐⭐⭐`,
  ];
  const closer = closers[Math.floor(Math.random() * closers.length)];

  return opener + body + closer;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {[1, 2].map(n => (
        <div key={n} className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
            ${step === n
              ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
              : step > n
              ? "bg-emerald-500 text-white"
              : "bg-white/10 text-white/40"}`}>
            {step > n ? <IconCheck size={14} /> : n}
          </div>
          <span className={`text-xs font-medium transition-colors duration-300 hidden sm:inline
            ${step === n ? "text-white" : "text-white/40"}`}>
            {n === 1 ? "Instructor Setup" : "Pupil Review"}
          </span>
          {n < 2 && (
            <div className={`w-8 h-px mx-1 transition-colors duration-300
              ${step > n ? "bg-emerald-500" : "bg-white/15"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Step 1: Instructor Setup ─────────────────────────────────────────────────

function Step1({ onNext }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Instructor name is required.";
    if (!link.trim()) {
      e.link = "Google review link is required.";
    } else {
      try { new URL(link.trim()); }
      catch { e.link = "Please enter a valid URL (include https://)."; }
    }
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext({ instructorName: name.trim(), reviewLink: link.trim() });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white">Instructor Setup</h2>
        <p className="text-white/50 text-sm mt-1">
          One-time setup — share the next page with every pupil who passes!
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: "" })); }}
          placeholder="e.g. Sarah Mitchell"
          className={`w-full bg-white/8 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/25 text-sm
            focus:outline-none focus:ring-2 transition-all duration-200
            ${errors.name ? "border-red-500/60 focus:ring-red-500/40" : "border-white/12 focus:ring-violet-500/50 focus:border-violet-500/50"}`}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
      </div>

      {/* Link */}
      <div>
        <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
          Google Review Short-Link
        </label>
        <input
          type="url"
          value={link}
          onChange={e => { setLink(e.target.value); setErrors(p => ({ ...p, link: "" })); }}
          placeholder="https://g.page/r/…/review"
          className={`w-full bg-white/8 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/25 text-sm
            focus:outline-none focus:ring-2 transition-all duration-200
            ${errors.link ? "border-red-500/60 focus:ring-red-500/40" : "border-white/12 focus:ring-violet-500/50 focus:border-violet-500/50"}`}
        />
        {errors.link && <p className="text-red-400 text-xs mt-1.5">{errors.link}</p>}
        <p className="text-white/30 text-xs mt-2">
          Find this in your Google Business Profile → Get more reviews.
        </p>
      </div>

      <button
        onClick={handleNext}
        className="w-full mt-2 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500
          active:bg-violet-700 text-white font-semibold py-4 rounded-xl transition-all duration-200
          shadow-lg shadow-violet-600/30 hover:shadow-violet-500/40 text-sm"
      >
        Continue to Pupil View
        <IconChevronRight size={18} />
      </button>
    </div>
  );
}

// ─── Step 2: Pupil Review ─────────────────────────────────────────────────────

function Step2({ instructorName, reviewLink, onBack }) {
  const [pupilName, setPupilName]       = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [review, setReview]             = useState("");
  const [copied, setCopied]             = useState(false);
  const [phase, setPhase]               = useState("build"); // "build" | "review"

  const toggleTag = id => {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const generate = useCallback(() => {
    const tags = ALL_TAGS.filter(t => selectedTags.includes(t.id));
    const draft = buildReview(pupilName, instructorName, tags);
    setReview(draft);
    setPhase("review");
    setCopied(false);
  }, [pupilName, instructorName, selectedTags]);

  const regenerate = () => {
    const tags = ALL_TAGS.filter(t => selectedTags.includes(t.id));
    setReview(buildReview(pupilName, instructorName, tags));
    setCopied(false);
  };

  const copyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
      setTimeout(() => window.open(reviewLink, "_blank", "noopener,noreferrer"), 600);
    } catch {
      // Fallback: select text manually
      setCopied(true);
    }
  };

  const canGenerate = selectedTags.length >= 1;

  return (
    <div className="space-y-5">
      {phase === "build" && (
        <>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              {[1,2,3,4,5].map(i => <IconStar key={i} size={18} />)}
            </div>
            <h2 className="text-2xl font-bold text-white">
              Leave a Review for
            </h2>
            <p className="text-violet-400 font-semibold text-lg">{instructorName}</p>
          </div>

          {/* Pupil name */}
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
              Your First Name (optional)
            </label>
            <input
              type="text"
              value={pupilName}
              onChange={e => setPupilName(e.target.value)}
              placeholder="e.g. Jamie"
              className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3.5 text-white
                placeholder:text-white/25 text-sm focus:outline-none focus:ring-2
                focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-3">
              Tap what describes {instructorName}
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map(tag => {
                const active = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium
                      border transition-all duration-200 active:scale-95
                      ${active
                        ? "bg-violet-600/80 border-violet-400/60 text-white shadow-md shadow-violet-600/20"
                        : "bg-white/6 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80"}`}
                  >
                    <span>{tag.emoji}</span>
                    <span>{tag.label}</span>
                    {active && (
                      <span className="ml-0.5 text-violet-300">
                        <IconCheck size={12} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedTags.length === 0 && (
              <p className="text-white/30 text-xs mt-2">Select at least one tag to continue.</p>
            )}
          </div>

          <button
            onClick={generate}
            disabled={!canGenerate}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-xl
              transition-all duration-200 text-sm shadow-lg
              ${canGenerate
                ? "bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white shadow-violet-600/30 hover:shadow-violet-500/40"
                : "bg-white/6 text-white/25 cursor-not-allowed border border-white/8"}`}
          >
            ✨ Generate My Review Draft
            <IconChevronRight size={18} />
          </button>
        </>
      )}

      {phase === "review" && (
        <>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              {[1,2,3,4,5].map(i => <IconStar key={i} size={18} />)}
            </div>
            <h2 className="text-2xl font-bold text-white">Your Review is Ready!</h2>
            <p className="text-white/40 text-sm mt-1">
              Edit if you like, then copy &amp; post it.
            </p>
          </div>

          {/* Review textarea */}
          <div className="relative">
            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
              rows={7}
              className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3.5 text-white/90
                text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-violet-500/50
                focus:border-violet-500/50 transition-all duration-200 resize-none"
            />
            <button
              onClick={regenerate}
              title="Regenerate"
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20
                text-white/50 hover:text-white transition-all duration-150"
            >
              <IconRefresh size={14} />
            </button>
          </div>

          {/* Info strip */}
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-400/20 rounded-xl px-4 py-3">
            <span className="text-lg shrink-0">💡</span>
            <p className="text-amber-200/80 text-xs leading-relaxed">
              Hit the button below — your review will be <strong className="text-amber-200">copied to your clipboard</strong>, then Google Maps will open so you can paste and post it!
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={copyAndOpen}
            className={`w-full flex items-center justify-center gap-2.5 font-semibold py-4 rounded-xl
              transition-all duration-300 text-sm shadow-xl
              ${copied
                ? "bg-emerald-600 text-white shadow-emerald-600/30"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-600/30"}`}
          >
            {copied ? (
              <>
                <IconCheck size={18} />
                Copied! Opening Google Maps…
              </>
            ) : (
              <>
                <IconCopy size={18} />
                Copy Review &amp; Open Google
                <IconExternalLink size={16} />
              </>
            )}
          </button>

          {/* Back to edit tags */}
          <button
            onClick={() => setPhase("build")}
            className="w-full flex items-center justify-center gap-2 text-white/40 hover:text-white/70
              text-sm py-2 transition-colors duration-150"
          >
            <IconChevronLeft size={16} />
            Back to edit tags
          </button>
        </>
      )}
    </div>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────

export default function ReviewMultiplierPage() {
  const [step, setStep]                     = useState(1);
  const [instructorName, setInstructorName] = useState("");
  const [reviewLink, setReviewLink]         = useState("");

  const handleStep1Next = ({ instructorName: n, reviewLink: l }) => {
    setInstructorName(n);
    setReviewLink(l);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] bg-[radial-gradient(ellipse_at_top,_#1e1030_0%,_#0D0D12_65%)] px-4 py-10 flex flex-col items-center">

      {/* Brand */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-1.5 mb-4">
          <span className="text-violet-400 text-xs font-semibold uppercase tracking-widest">
            🚗 For UK Driving Instructors
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          Google Maps<br />
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Review Multiplier
          </span>
        </h1>
        <p className="text-white/40 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
          Turn every passed test into a glowing 5-star review — in under 60 seconds.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg">
        <StepIndicator step={step} />

        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-8
          shadow-2xl shadow-black/50 backdrop-blur-sm">

          {step === 1 && (
            <Step1 onNext={handleStep1Next} />
          )}

          {step === 2 && (
            <>
              {/* Edit instructor info */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/8">
                <div>
                  <p className="text-white/40 text-xs">Posting review for</p>
                  <p className="text-white font-semibold text-sm">{instructorName}</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-violet-400
                    bg-white/6 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all duration-150"
                >
                  <IconEdit size={12} />
                  Edit
                </button>
              </div>
              <Step2
                instructorName={instructorName}
                reviewLink={reviewLink}
                onBack={() => setStep(1)}
              />
            </>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Reviews are generated locally. No data is stored or sent anywhere.
        </p>
      </div>
    </div>
  );
}