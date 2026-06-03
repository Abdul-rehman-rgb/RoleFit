import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import interviewService from "../../api/interview.service";

function extractReport(data) {
  let report = data?.report;
  if (Array.isArray(report)) report = report[0];
  if (report?.report) {
    report = Array.isArray(report.report) ? report.report[0] : report.report;
  }
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    return null;
  }
  return report;
}

export const generateInterviewReport = createAsyncThunk(
  "interview/generate",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await interviewService.generateReport(payload);
      const report = extractReport(data);
      if (!report) {
        return rejectWithValue("No report returned from server");
      }
      return { report, generatedAt: data.generatedAt || new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to generate report");
    }
  }
);

export const fetchLastInterviewReport = createAsyncThunk(
  "interview/fetchLast",
  async (_, { rejectWithValue }) => {
    try {
      const data = await interviewService.getLastReport();
      const report = extractReport(data);
      if (!report) {
        return rejectWithValue("No saved report found");
      }
      return { report, generatedAt: data.generatedAt || null };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load last report");
    }
  }
);

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    report: null,
    generatedAt: null,
    loading: false,
    loadingLast: false,
    error: null,
  },
  reducers: {
    clearInterviewReport: (state) => {
      state.report = null;
      state.generatedAt = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateInterviewReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateInterviewReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.generatedAt = action.payload.generatedAt;
      })
      .addCase(generateInterviewReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLastInterviewReport.pending, (state) => {
        state.loadingLast = true;
        state.error = null;
      })
      .addCase(fetchLastInterviewReport.fulfilled, (state, action) => {
        state.loadingLast = false;
        state.report = action.payload.report;
        state.generatedAt = action.payload.generatedAt;
      })
      .addCase(fetchLastInterviewReport.rejected, (state, action) => {
        state.loadingLast = false;
        state.error = action.payload;
      });
  },
});

export const { clearInterviewReport } = interviewSlice.actions;
export default interviewSlice.reducer;
