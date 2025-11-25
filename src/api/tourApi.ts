// src/services/tourApi.ts
// Service để gọi API backend Spring Boot

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
    // Lấy token từ localStorage nếu có
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

export interface TourListResponse {
  totalPages: number;
  totalItems: number;
  page: number;
  limit: number;
  tours: TourDetailResponse[];
}

export interface LocationResponse {
  id: number;
  name: string;
  selected: boolean;
}

export interface TourScheduleResponse {
  id: number;
  title: string;
  description: string;
}

export interface TourDetailResponse {
  id: number;
  name: string;
  avatar: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  isOnSale: boolean;
  tourDetail: string;
  startDate: [number, number, number];
  duration: string;
  remainSlot: number;
  rating: number;
  reviewCount: number;
  promotionName: string;
  images: string[];
  schedules: TourScheduleResponse[];
  locations: LocationResponse[];
}

export interface TourFilterParams {
  offset?: number;
  limit?: number;
  typeId?: number | null;
  name?: string;
  priceFrom?: number;
  priceTo?: number;
  startDate?: string;
}

// ============== ADMIN TYPES ==============

export interface LocationResponse {
  id: number;
  name: string;
  selected: boolean;
}

export interface TourTypeResponse {
  id: number;
  name: string;
  description: string;
  status: number;
  parentId: number | null;
  tourTypes?: TourTypeResponse[];
  children?: TourTypeResponse[];
  selected: boolean;
}

export interface TourAdminInitResponse {
  locations: LocationResponse[];
  tourTypes: TourTypeResponse[];
}

export interface TourScheduleRequest {
  title: string;
  description: string;
}

export interface TourAdminRequest {
  name: string;
  avatar?: string;
  priceAdult: number;
  priceChild: number;
  priceInfant: number;
  description?: string;
  tourDetail: string;
  note?: string;
  remainAdult: number;
  remainChild: number;
  remainInfant: number;
  duration: number;
  transport: string;
  status: number;
  tourTypeId: number;
  locationIds: number[];
  departureDates: string; // Format: dd/MM/yyyy
  schedules: TourScheduleRequest[];
  discount?: number;
  discountType?: string;
}

// ============== API FUNCTIONS ==============

/**
 * Lấy danh sách tours với filters
 */
export const getTours = async (
  offset: number = 0,
  limit: number = 10,
  typeId: number | null = null,
  name: string = "",
  priceFrom?: number,
  priceTo?: number,
  startDate?: string
) => {
  console.log("Calling getTours API:", {
    offset,
    limit,
    typeId,
    name,
    priceFrom,
    priceTo,
    startDate,
  });

  return api.get<TourListResponse>("/tours", {
    params: {
      offset,
      limit,
      typeId: typeId ?? undefined,
      name: name || undefined,
      priceFrom,
      priceTo,
      startDate,
    },
  });
};

/**
 * Lấy chi tiết một tour
 */
export const getTourDetail = async (id: number) => {
  console.log("🚀 Calling getTourDetail API:", id);
  return api.get<TourDetailResponse>(`/tours/${id}`);
};

/**
 * Lấy dữ liệu khởi tạo cho form admin (locations, tourTypes)
 */
export const getTourInitData = async () => {
  console.log("🚀 Calling getTourInitData API");
  return api.get<TourAdminInitResponse>("/tours/admin");
};

/**
 * Tạo tour mới (Admin)
 */
export const createTour = async (data: TourAdminRequest) => {
  console.log("🚀 Calling createTour API:", data);
  return api.post<number>("/tours/create", data);
};

/**
 * Xóa tour (Admin)
 */
export const deleteTour = async (id: number) => {
  console.log("🚀 Calling deleteTour API:", id);
  return api.delete<string>(`/tours/${id}`);
};

/**
 * Upload hình ảnh tour (Admin)
 */
export const uploadTourImages = async (id: number, files: File[]) => {
  console.log("🚀 Calling uploadTourImages API:", id, files.length);

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  return api.post(`/tours/uploads/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Lấy tours theo type ID
 */
export const getToursByType = async (typeId: number, limit: number = 10) => {
  console.log("🚀 Calling getToursByType API:", typeId);
  return getTours(0, limit, typeId);
};

// Export axios instance nếu cần custom requests
export { api };
