export const dynamic = "force-dynamic";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // backend của bạn
});

export const getResponeAi = (question: string) => {
  return api.post<string>("/ask", { question });
};
