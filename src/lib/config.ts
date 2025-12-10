// SG API configuration
export const SG_API_BASE_URL = 'http://127.0.0.1:3000/api/v1'

// Other app constants
export const APP_NAME = 'SilverGuild'

// API Endpoints
export const SG_API_ENDPOINTS = {
    users: '/users',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userById: (id: number) => `/users/${id}`,
    charactersByUserId: (userId: number) => `/user/${userId}/characters`,
    characterById: (id: number) => `/characters/${id}`
} as const
