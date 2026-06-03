import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../store/slices/authSlice";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? "text-indigo-600" : "text-neutral-600 hover:text-neutral-900"
  }`;

const SiteHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight text-neutral-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm text-white">
            RF
          </span>
          RoleFit
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/how-it-works" className={navLinkClass}>
            How It Works
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/interview" className={navLinkClass}>
                Interview Prep
              </NavLink>
              <NavLink to="/interview/last-report" className={navLinkClass}>
                Last Report
              </NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-neutral-500 sm:inline">
                Hi, {user?.name?.split(" ")[0] || "there"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:opacity-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
