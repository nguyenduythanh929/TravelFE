// src/api/tourTypeApi.ts
// Service để gọi API Tour Types từ backend Spring Boot

import axios from "axios";

// Lấy URL từ environment variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088/api";

// Tạo axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor để thêm token (nếu có)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("sessionToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor để handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(
      `❌ API Error: ${error.config?.url}`,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// ============== TYPES ==============

export interface TourTypeResponse {
  id: number;
  name: string;
  value?: string;
  description: string;
  status: number;
  parentId: number | null;
  tourTypes?: TourTypeResponse[];
  children?: TourTypeResponse[];
  selected: boolean;
}

// ============== API FUNCTIONS ==============

/**
 * Lấy cấu trúc cây tour types từ backend
 */
export const getTourTypesTree = async (): Promise<TourTypeResponse[]> => {
  console.log("🚀 Calling getTourTypesTree API");
  try {
    const response = await api.get<TourTypeResponse[]>("/tour_types/tree");
    return response.data;
  } catch (error) {
    console.error("Error fetching tour types tree:", error);
    throw error;
  }
};

/**
 * Lấy tất cả tour types (flat list)
 */
export const getAllTourTypes = async (): Promise<TourTypeResponse[]> => {
  console.log("🚀 Calling getAllTourTypes API");
  try {
    const response = await api.get<TourTypeResponse[]>("/tour_types");
    return response.data;
  } catch (error) {
    console.error("Error fetching all tour types:", error);
    throw error;
  }
};

/**
 * Lấy chi tiết một tour type
 */
export const getTourTypeById = async (
  id: number
): Promise<TourTypeResponse> => {
  console.log("🚀 Calling getTourTypeById API:", id);
  try {
    const response = await api.get<TourTypeResponse>(`/tour_types/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tour type by id:", error);
    throw error;
  }
};

export const getTourTypeByTourId = async (
  tourId: number
): Promise<TourTypeResponse> => {
  try {
    const response = await api.get<TourTypeResponse>(
      `/tour_types/tour/${tourId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tour type by id:", error);
    throw error;
  }
};

// Export axios instance nếu cần custom requests
export { api };
