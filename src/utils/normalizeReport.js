function unwrapReport(raw) {
  if (!raw) return null;
  if (Array.isArray(raw)) return raw[0] || null;
  if (raw.report && typeof raw.report === "object") {
    return Array.isArray(raw.report) ? raw.report[0] : raw.report;
  }
  return raw;
}

function toMatchPercent(score) {
  if (score == null || score === "") return null;
  const n = Number(score);
  if (Number.isNaN(n)) return null;
  if (n > 0 && n <= 1) return Math.round(n * 100);
  return Math.min(100, Math.max(0, Math.round(n)));
}

const MATCH_KEY_RE =
  /^(match_percentage|matchPercentage|match_score|matchScore|skills_match_score|overall_score)$/i;

function deepFindMatchScore(obj, depth = 0) {
  if (!obj || typeof obj !== "object" || depth > 3) return null;

  for (const [key, value] of Object.entries(obj)) {
    if (MATCH_KEY_RE.test(key) || /match|score/i.test(key)) {
      const percent = toMatchPercent(value);
      if (percent != null && percent > 0) return percent;
    }
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const found = deepFindMatchScore(value, depth + 1);
      if (found != null && found > 0) return found;
    }
  }

  return null;
}

function estimateMatchScore(report) {
  const core = report.core_skills_match || report.coreSkillsMatch || [];
  const missing = report.missing_skills || report.missingSkills || [];
  const coreLen = Array.isArray(core) ? core.length : 0;
  const missingLen = Array.isArray(missing) ? missing.length : 0;

  if (coreLen + missingLen > 0) {
    return Math.round((coreLen / (coreLen + missingLen)) * 100);
  }

  const sLen = (report.strengths || []).length;
  const wLen = (report.weaknesses || []).length;
  if (sLen + wLen > 0) {
    return Math.min(95, Math.max(20, Math.round((sLen / (sLen + wLen)) * 100)));
  }

  return 0;
}

function extractMatchScore(report) {
  const direct = toMatchPercent(
    report.match_percentage ??
      report.matchPercentage ??
      report.skills_match_score ??
      report.matchScore ??
      null,
  );
  if (direct != null && direct > 0) return direct;

  const deep = deepFindMatchScore(report);
  if (deep != null && deep > 0) return deep;

  return estimateMatchScore(report);
}

/**
 * Normalizes interview API / DB responses for the report UI.
 */
export function normalizeReport(raw) {
  const report = unwrapReport(raw);
  if (!report || typeof report !== "object") return null;

  const matchScore = extractMatchScore(report);

  const coreSkills =
    report.core_skills_match || report.coreSkillsMatch || [];
  const missingSkills =
    report.missing_skills || report.missingSkills || [];

  return {
    format: "skills",
    candidateName: report.candidate_name || report.candidateName || "",
    jobTitle: report.job_title || report.jobTitle || report.title || "",
    experienceYears: report.experience_years ?? report.experienceYears ?? null,
    matchScore,
    technicalAlignment:
      report.technical_alignment || report.technicalAlignment || "",
    experienceGap:
      report.experience_gap ||
      report.experienceGap ||
      report.overall_assessment ||
      report.overallAssessment ||
      "",
    coreSkillsMatch: Array.isArray(coreSkills) ? coreSkills : [],
    missingSkills: Array.isArray(missingSkills) ? missingSkills : [],
    strengths: report.strengths || [],
    weaknesses: report.weaknesses || [],
    hiringRecommendation:
      report.hiring_recommendation ||
      report.hiringRecommendation ||
      report.interview_recommendation ||
      report.interviewRecommendation ||
      "",
    interviewNotes: report.interview_notes || report.interviewNotes || "",
    generatedAt: report.generatedAt || report.createdAt || null,
    technicalQuestions: report.technicalQuestions || [],
    behavioralQuestions: report.behavioralQuestions || [],
    skillGaps: report.skillGaps || [],
    preparationPlan: report.preparationPlan || [],
  };
}

export function getRecommendationStyle(recommendation) {
  const text = (recommendation || "").toLowerCase();
  if (text.includes("not recommended")) {
    return "bg-red-100 text-red-800 border-red-200";
  }
  if (text.includes("caution") || text.includes("conditional")) {
    return "bg-amber-100 text-amber-800 border-amber-200";
  }
  if (text.includes("interview") || text.includes("recommended")) {
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  }
  return "bg-indigo-100 text-indigo-800 border-indigo-200";
}

export function getAlignmentStyle(alignment) {
  const text = (alignment || "").toLowerCase();
  if (text === "high") return "bg-emerald-100 text-emerald-800";
  if (text === "low") return "bg-red-100 text-red-800";
  return "bg-amber-100 text-amber-800";
}
