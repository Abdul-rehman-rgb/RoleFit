import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../../store/slices/authSlice";
import { normalizeReport } from "../../../utils/normalizeReport";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { report: rawReport } = useSelector((state) => state.interview);
  const report = normalizeReport(rawReport);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-16">
      <div className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-medium text-indigo-600">Welcome back</p>
        <h1 className="mt-2 text-3xl font-bold text-neutral-900">
          {user?.name || "Your dashboard"}
        </h1>
        <p className="mt-2 text-neutral-500">{user?.email}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            to="/interview"
            className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-indigo-300 hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden>
              🎤
            </span>
            <h2 className="mt-4 font-semibold text-neutral-900 group-hover:text-indigo-700">
              Interview Prep
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Upload your resume, add a job description, and generate a tailored
              report.
            </p>
          </Link>

          {report && (
            <Link
              to="/interview/last-report"
              className="group rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 transition hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden>
                📊
              </span>
              <h2 className="mt-4 font-semibold text-neutral-900 group-hover:text-indigo-700">
                View last report
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                {report.jobTitle || "Last report"} — {report.matchScore}% match.
                View strengths, gaps, and notes.
              </p>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="mt-10 rounded-xl border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 disabled:opacity-50"
        >
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
