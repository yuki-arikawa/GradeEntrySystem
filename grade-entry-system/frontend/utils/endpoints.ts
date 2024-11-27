const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export const ENDPOINTS = {
  LOGIN:    `${BASE_URL}/auth/login`,
  LOGOUT:   `${BASE_URL}/auth/logout`,
  CHECK:    `${BASE_URL}/auth/check`,
  ENTRY:    `${BASE_URL}/scores/entry`,
  HISTORY:  `${BASE_URL}/scores/history`,
  SUMMARY:  `${BASE_URL}/scores/summary`,
};