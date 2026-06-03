export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function parseResponse(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

async function request(method, path, body) {
  const options = {
    method,
    credentials: "include",
    headers: {},
  };

  if (body !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, options);
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

export const apiClient = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
};

export { ApiError };
