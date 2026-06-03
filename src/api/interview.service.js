import { apiClient, ApiError, API_BASE_URL } from "./client";

async function parseResponse(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

const interviewService = {
  getLastReport: () => apiClient.get("/interview/last"),

  generateReport: async ({ resume, selfDescription, jobDescription, resumeFile }) => {
    if (resumeFile) {
      const formData = new FormData();
      formData.append("resumeFile", resumeFile);
      if (resume) formData.append("resume", resume);
      if (selfDescription) formData.append("selfDescription", selfDescription);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(`${API_BASE_URL}/interview`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await parseResponse(response);
      if (!response.ok) {
        throw new ApiError(
          data.message || "Something went wrong",
          response.status,
          data
        );
      }
      return data;
    }

    return apiClient.post("/interview", {
      resume,
      selfDescription,
      jobDescription,
    });
  },
};

export default interviewService;
