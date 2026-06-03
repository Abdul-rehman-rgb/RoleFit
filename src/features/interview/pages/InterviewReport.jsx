import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  clearInterviewReport,
  fetchLastInterviewReport,
} from "../../../store/slices/interviewSlice";
import {
  normalizeReport,
  getRecommendationStyle,
  getAlignmentStyle,
} from "../../../utils/normalizeReport";

function MatchScoreRing({ score }) {
  const value = Math.min(100, Math.max(0, Number(score) || 0));
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
      <svg className="-rotate-90" width="160" height="160" aria-hidden>
        <circle cx="80" cy="80" r="54" fill="none" stroke="#e5e5e5" strokeWidth="12" />
        <circle
          cx="80"
          cy="80"
          r="54"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-bold text-neutral-900">{value}%</p>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Match
        </p>
      </div>
    </div>
  );
}

function SkillTags({ skills, variant }) {
  const list = Array.isArray(skills) ? skills : [];
  if (!list.length) {
    return <p className="text-sm text-neutral-500">None listed</p>;
  }
  const styles =
    variant === "match"
      ? "bg-indigo-50 text-indigo-800 border-indigo-100"
      : "bg-red-50 text-red-800 border-red-100";

  return (
    <div className="flex flex-wrap gap-2">
      {list.map((skill) => (
        <span
          key={skill}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${styles}`}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items, variant }) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return null;
  return (
    <ul className="space-y-3">
      {list.map((item, i) => (
        <li
          key={i}
          className={`flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
            variant === "strength"
              ? "border-emerald-100 bg-emerald-50/50 text-neutral-700"
              : "border-red-100 bg-red-50/50 text-neutral-700"
          }`}
        >
          <span className="shrink-0 font-bold">
            {variant === "strength" ? "✓" : "!"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const InterviewReport = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const forceLast = location.pathname.includes("last-report");

  const { report: rawReport, generatedAt, loadingLast, error } = useSelector(
    (state) => state.interview
  );

  useEffect(() => {
    if (forceLast) {
      dispatch(fetchLastInterviewReport());
      return;
    }
    if (!rawReport) {
      dispatch(fetchLastInterviewReport());
    }
  }, [dispatch, forceLast]);

  const report = normalizeReport(
    rawReport ? { ...rawReport, generatedAt } : null
  );

  if (loadingLast && !report) {
    return (
      <main className="mx-auto max-w-6xl flex-1 px-6 py-20 text-center">
        <p className="text-lg font-medium text-neutral-700">Loading your report...</p>
        <p className="mt-2 text-sm text-neutral-500">Reading saved assessment data</p>
      </main>
    );
  }

  if (!report && !loadingLast) {
    return (
      <main className="mx-auto max-w-lg flex-1 px-6 py-20 text-center">
        <p className="text-lg font-medium text-neutral-800">No report yet</p>
        <p className="mt-2 text-neutral-500">
          {error || "Generate an interview report to see skills, gaps, and recommendations."}
        </p>
        <Link
          to="/interview"
          className="mt-8 inline-flex rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white"
        >
          Generate report
        </Link>
      </main>
    );
  }

  if (!report) return null;

  const {
    candidateName,
    jobTitle,
    experienceYears,
    matchScore,
    technicalAlignment,
    experienceGap,
    coreSkillsMatch,
    missingSkills,
    strengths,
    weaknesses,
    hiringRecommendation,
    interviewNotes,
    generatedAt: reportDate,
  } = report;

  const formattedDate = reportDate
    ? new Date(reportDate).toLocaleString()
    : null;

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            to="/interview"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900"
          >
            ← Interview prep
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900">
            {forceLast ? "Last generated report" : "Interview report"}
          </h1>
          {candidateName && (
            <p className="mt-1 text-xl font-medium text-neutral-800">
              {candidateName}
            </p>
          )}
          {jobTitle && (
            <p className="text-indigo-600 font-medium">{jobTitle}</p>
          )}
          {formattedDate && (
            <p className="mt-1 text-sm text-neutral-400">Generated {formattedDate}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/interview/last-report"
            className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-white"
          >
            Refresh last report
          </Link>
          <Link
            to="/interview"
            onClick={() => dispatch(clearInterviewReport())}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            New report
          </Link>
        </div>
      </div>

      <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm lg:flex lg:items-center lg:gap-10">
        <MatchScoreRing score={matchScore} />
        <div className="mt-8 flex-1 lg:mt-0">
          <div className="flex flex-wrap gap-2">
            {technicalAlignment && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${getAlignmentStyle(technicalAlignment)}`}
              >
                Technical: {technicalAlignment}
              </span>
            )}
            {experienceYears != null && (
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                {experienceYears} years experience
              </span>
            )}
          </div>
          {hiringRecommendation && (
            <p
              className={`mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold leading-relaxed ${getRecommendationStyle(hiringRecommendation)}`}
            >
              {hiringRecommendation}
            </p>
          )}
          {experienceGap && (
            <p className="mt-4 leading-relaxed text-neutral-600">{experienceGap}</p>
          )}
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-indigo-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900">
            Core skills match
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Skills from the job description you already have
          </p>
          <div className="mt-5">
            <SkillTags skills={coreSkillsMatch} variant="match" />
          </div>
        </section>

        <section className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900">Missing skills</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Gaps to learn or highlight before applying
          </p>
          <div className="mt-5">
            <SkillTags skills={missingSkills} variant="missing" />
          </div>
        </section>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50/30 p-8">
          <h2 className="text-xl font-bold text-neutral-900">Strengths</h2>
          <div className="mt-5">
            <BulletList items={strengths} variant="strength" />
          </div>
        </section>

        <section className="rounded-3xl border border-red-200 bg-red-50/30 p-8">
          <h2 className="text-xl font-bold text-neutral-900">
            Weaknesses & concerns
          </h2>
          <div className="mt-5">
            <BulletList items={weaknesses} variant="weakness" />
          </div>
        </section>
      </div>

      {interviewNotes && (
        <section className="mt-10 rounded-3xl border border-indigo-200 bg-indigo-50/40 p-8">
          <h2 className="text-xl font-bold text-neutral-900">Additional notes</h2>
          <p className="mt-4 leading-relaxed text-neutral-700">{interviewNotes}</p>
        </section>
      )}
    </main>
  );
};

export default InterviewReport;
