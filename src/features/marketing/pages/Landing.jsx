import { Link } from "react-router";
import { useSelector } from "react-redux";

const features = [
  {
    title: "Resume upload & text",
    description:
      "Paste your resume or upload PDF/DOCX. Our AI reads your experience and skills automatically.",
    icon: "📄",
  },
  {
    title: "Job-tailored reports",
    description:
      "Paste any job description and get a match score, skill gaps, and a focused prep plan.",
    icon: "🎯",
  },
  {
    title: "Interview questions",
    description:
      "Technical and behavioral questions with interviewer intent and model answers.",
    icon: "💬",
  },
  {
    title: "ATS-friendly focus",
    description:
      "Built to help your profile align with what recruiters and ATS systems look for.",
    icon: "✓",
  },
];

const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const ctaTo = isAuthenticated ? "/interview" : "/register";
  const ctaLabel = isAuthenticated ? "Start interview prep" : "Get started free";

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-indigo-950 to-violet-950 px-6 py-24 text-white md:py-32">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            AI-powered career toolkit
          </span>
          <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Turn your resume into interview-ready confidence
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-indigo-100/90">
            RoleFit analyzes your profile against any job posting, surfaces skill
            gaps, and builds a day-by-day preparation plan — so you walk into
            interviews prepared, not guessing.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={ctaTo}
              className="rounded-xl bg-white px-8 py-3.5 font-semibold text-neutral-900 shadow-lg transition hover:bg-indigo-50"
            >
              {ctaLabel}
            </Link>
            <Link
              to="/how-it-works"
              className="rounded-xl border border-white/30 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              See how it works
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-12 md:max-w-xl">
            <div>
              <p className="text-3xl font-bold">10k+</p>
              <p className="mt-1 text-sm text-indigo-200">Reports generated</p>
            </div>
            <div>
              <p className="text-3xl font-bold">95%</p>
              <p className="mt-1 text-sm text-indigo-200">User satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="mt-1 text-sm text-indigo-200">AI assistance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900">Everything you need to prepare</h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-500">
            From resume parsing to personalized interview coaching — one platform,
            one workflow.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
            >
              <span className="text-3xl" aria-hidden>
                {item.icon}
              </span>
              <h3 className="mt-4 font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-r from-indigo-50 to-violet-50 p-10 md:p-14">
          <div className="md:flex md:items-center md:justify-between md:gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-neutral-900">
                Ready to ace your next interview?
              </h2>
              <p className="mt-4 text-neutral-600">
                Create a free account, upload your resume, paste the job description,
                and get your personalized report in minutes.
              </p>
            </div>
            <Link
              to={ctaTo}
              className="mt-8 inline-flex shrink-0 rounded-xl bg-neutral-900 px-8 py-3.5 font-semibold text-white transition hover:bg-neutral-800 md:mt-0"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
