import { SG_API_BASE_URL, SG_API_ENDPOINTS } from './config';
import { Character } from '@/types/character';
import { User } from '@/types/user';

export async function apiRequest<T>(
    endpoint: string,
    options?: RequestInit 
): Promise<T> {
   const response = await fetch(`${SG_API_BASE_URL}${endpoint}`, {
    headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
    },
    ...options,
   });

   if(!response.ok) {
    throw new Error(`API ERROR: ${response.statusText}`);
   }

   return response.json();
}

export async function fetchUser(id: number): Promise<User> {
    return apiRequest<User>(SG_API_ENDPOINTS.userById(id))
}