// src/services/chatbotApi.ts
// Service để gọi Python AI chatbot backend

import axios from "axios";

// Lấy URL từ environment variables
const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_URL || "http://localhost:8000";

// Tạo axios instance cho AI service
const aiApi = axios.create({
  baseURL: AI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout cho AI
});

// Add interceptors
aiApi.interceptors.request.use(
  (config) => {
    console.log("🤖 Calling AI API:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

aiApi.interceptors.response.use(
  (response) => {
    console.log("✅ AI Response:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ AI Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============== TYPES ==============

export interface ChatbotRequest {
  question: string;
}

export interface ChatbotResponse {
  answer: string;
  confidence?: number;
  sources?: string[];
}

// ============== API FUNCTIONS ==============

/**
 * Gửi câu hỏi đến chatbot AI
 */
export const getAIResponse = async (
  question: string
): Promise<ChatbotResponse> => {
  console.log("🤖 Sending question to AI:", question);

  try {
    const response = await aiApi.post<ChatbotResponse>("/ask", {
      question,
    });

    return response.data;
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};

/**
 * Health check cho AI service
 */
export const checkAIHealth = async () => {
  try {
    const response = await aiApi.get("/health");
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Export axios instance
export { aiApi };
