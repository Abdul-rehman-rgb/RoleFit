import { Link } from "react-router";

const values = [
  {
    title: "Clarity over noise",
    description:
      "We turn dense job postings and long resumes into clear, actionable insights you can use the same day.",
  },
  {
    title: "Honest AI guidance",
    description:
      "Our reports highlight real skill gaps and preparation steps — not generic fluff that sounds good but helps no one.",
  },
  {
    title: "Built for job seekers",
    description:
      "Whether you are switching careers or leveling up, RoleFit adapts to your background and the role you want.",
  },
];

const About = () => (
  <div className="mx-auto max-w-6xl px-6 py-16">
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        About Us
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
        Helping candidates show up prepared
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-neutral-600">
        RoleFit was built for people who are tired of sending applications into
        the void. We combine resume understanding, job-description analysis, and
        interview preparation into one intelligent workflow — powered by modern AI,
        designed for real hiring processes.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {values.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-neutral-900">{item.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            {item.description}
          </p>
        </article>
      ))}
    </div>

    <section className="mt-20 rounded-3xl bg-neutral-900 px-8 py-12 text-white md:px-12">
      <h2 className="text-2xl font-bold">Our mission</h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-neutral-300">
        Democratize access to high-quality career coaching. Everyone deserves a
        clear picture of how they match a role and what to study before the
        interview — not only those who can afford expensive career consultants.
      </p>
      <Link
        to="/register"
        className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-indigo-50"
      >
        Join RoleFit
      </Link>
    </section>
  </div>
);

export default About;
