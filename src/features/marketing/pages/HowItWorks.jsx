import { Link } from "react-router";

const steps = [
  {
    step: "01",
    title: "Create your account",
    description:
      "Sign up in seconds with email. Your session stays secure so you can return to reports anytime.",
  },
  {
    step: "02",
    title: "Add your profile",
    description:
      "Paste resume text, upload a PDF or DOCX file, or describe yourself in your own words.",
  },
  {
    step: "03",
    title: "Paste the job description",
    description:
      "Copy the listing from LinkedIn, Indeed, or any company page — the more detail, the better the match.",
  },
  {
    step: "04",
    title: "Get your interview report",
    description:
      "Receive match score, technical & behavioral Q&A, skill gaps with severity, and a day-by-day prep plan.",
  },
];

const HowItWorks = () => (
  <div className="mx-auto max-w-6xl px-6 py-16">
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        How It Works
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
        Four steps from resume to ready
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-neutral-600">
        RoleFit guides you through a simple flow. No complicated setup — just your
        materials and the job you are targeting.
      </p>
    </div>

    <ol className="mt-16 space-y-6">
      {steps.map((item, index) => (
        <li
          key={item.step}
          className="relative flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm md:flex-row md:items-start"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white">
            {item.step}
          </span>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-neutral-900">{item.title}</h2>
            <p className="mt-2 leading-relaxed text-neutral-500">{item.description}</p>
          </div>
          {index < steps.length - 1 && (
            <span
              className="absolute -bottom-3 left-10 hidden h-6 w-0.5 bg-indigo-200 md:block"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>

    <div className="mt-16 text-center">
      <Link
        to="/register"
        className="inline-flex rounded-xl bg-neutral-900 px-8 py-3.5 font-semibold text-white transition hover:bg-neutral-800"
      >
        Start your first report
      </Link>
      <p className="mt-4 text-sm text-neutral-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  </div>
);

export default HowItWorks;
