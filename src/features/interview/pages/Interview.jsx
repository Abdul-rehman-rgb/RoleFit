import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { generateInterviewReport } from "../../../store/slices/interviewSlice";

const textareaClassName =
  "w-full resize-y rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 min-h-[100px]";

const Interview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.interview);

  const [form, setForm] = useState({
    resume: "",
    selfDescription: "",
    jobDescription: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      generateInterviewReport({
        ...form,
        resumeFile,
      })
    );
    if (generateInterviewReport.fulfilled.match(result)) {
      navigate("/interview/report");
    }
  };

  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-10">
      <div className="mb-6 flex justify-end">
        <Link
          to="/interview/last-report"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          View last generated report →
        </Link>
      </div>
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Interview Prep
        </p>
        <h1 className="mt-2 text-3xl font-bold text-neutral-900">
          Generate your report
        </h1>
        <p className="mt-2 text-neutral-500">
          Add your resume (text or file) and the job description. You will be
          taken to a formatted report when ready.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Resume
            </label>
            <input
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="mb-3 w-full text-sm text-neutral-600 file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:font-medium file:text-neutral-800 hover:file:bg-neutral-200"
            />
            {resumeFile && (
              <p className="mb-3 text-sm text-neutral-500">
                Uploaded: {resumeFile.name}
              </p>
            )}
            <textarea
              name="resume"
              value={form.resume}
              onChange={handleChange}
              placeholder="Or paste resume text (PDF/DOCX upload takes priority)..."
              className={textareaClassName}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Self description (optional)
            </label>
            <textarea
              name="selfDescription"
              value={form.selfDescription}
              onChange={handleChange}
              placeholder="About you..."
              className={textareaClassName}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Job description
            </label>
            <textarea
              name="jobDescription"
              value={form.jobDescription}
              onChange={handleChange}
              required
              placeholder="Paste job posting..."
              className={textareaClassName}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-neutral-900 py-3 font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? "Generating report (15–30 sec)..." : "Generate report"}
          </button>
        </form>

        {loading && (
          <p className="mt-6 text-center text-sm text-neutral-500">
            Analyzing your profile against the job description...
          </p>
        )}
      </div>
    </main>
  );
};

export default Interview;
