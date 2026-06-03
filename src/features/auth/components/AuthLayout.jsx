import { Link } from "react-router";
import SiteHeader from "../../../components/layout/SiteHeader";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <SiteHeader />
      <main className="flex flex-1">
        <div className="hidden flex-1 flex-col justify-center bg-gradient-to-br from-neutral-900 via-indigo-950 to-violet-950 px-16 text-white lg:flex">
          <div className="max-w-lg">
            <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-sm">
              AI-Powered Resume Builder
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight">RoleFit</h1>
            <p className="mt-4 text-lg leading-relaxed text-indigo-100/80">
              Create ATS-friendly resumes, optimize your profile, and land
              interviews faster with AI assistance.
            </p>
            <div className="mt-10 flex gap-8">
              <div>
                <h3 className="text-2xl font-semibold">10k+</h3>
                <p className="text-sm text-indigo-200">Resumes Generated</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">95%</h3>
                <p className="text-sm text-indigo-200">ATS Success Rate</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">24/7</h3>
                <p className="text-sm text-indigo-200">AI Assistance</p>
              </div>
            </div>
            <p className="mt-10 text-sm text-indigo-200/80">
              <Link to="/about" className="underline hover:text-white">
                About us
              </Link>
              {" · "}
              <Link to="/how-it-works" className="underline hover:text-white">
                How it works
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-neutral-900">{title}</h2>
                <p className="mt-2 text-neutral-500">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
