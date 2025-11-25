// SG API configuration
export const SG_API_BASE_URL = 'http://127.0.0.1:3000/api/v1';

// Other app constants
export const APP_NAME = 'SilverGuild';

// API Endpoints
export const SG_API_ENDPOINTS = {
    users: '/users',
    userById: (id: number ) => `/users/${id}`,
    characters: '/characters',
    characterById: (id: number) => `/characters/$(id)`,
} as const;