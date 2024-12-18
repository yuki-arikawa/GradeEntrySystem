const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://grade-entry-system.yarikawa0220.workers.dev";

export const ENDPOINTS = {
  LOGIN:    `${BASE_URL}/auth/login`,
  LOGOUT:   `${BASE_URL}/auth/logout`,
  CHECK:    `${BASE_URL}/auth/check`,
  CHPASS:   `${BASE_URL}/auth/change-password`,
  ENTRY:    `${BASE_URL}/scores/entry`,
  HISTORY:  `${BASE_URL}/scores/history`,
  SUMMARY:  `${BASE_URL}/teacher/summary`,
};