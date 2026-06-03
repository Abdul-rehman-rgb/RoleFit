import { Link } from "react-router";

const SiteFooter = () => (
  <footer className="border-t border-neutral-200 bg-white">
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-neutral-900">RoleFit</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
            AI-powered resume optimization and interview preparation so you can
            land the role you want.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-500">
            <li>
              <Link to="/about" className="transition hover:text-neutral-900">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="transition hover:text-neutral-900">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/interview" className="transition hover:text-neutral-900">
                Interview Prep
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Account</p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-500">
            <li>
              <Link to="/login" className="transition hover:text-neutral-900">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="transition hover:text-neutral-900">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-10 border-t border-neutral-100 pt-8 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} RoleFit. All rights reserved.
      </p>
    </div>
  </footer>
);

export default SiteFooter;
