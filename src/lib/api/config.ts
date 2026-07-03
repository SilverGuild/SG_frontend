// SG API configuration
export const SG_API_BASE_URL = process.env.NEXT_PUBLIC_SG_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1'

// Other app constants
export const APP_NAME = 'SilverGuild'

// API Endpoints
export const SG_API_ENDPOINTS = {
    userById: (id: number) => `/users/${id}`,
    charactersByUserId: (userId: number) => `/users/${userId}/characters`,
    characterById: (id: number) => `/characters/${id}`,
    // Auth
    signup: () => `/signup`,
    login: () => `/login`,
    logout: () => `/logout`,
    current: () => `/current`,
} as const
