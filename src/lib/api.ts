import { SG_API_BASE_URL, SG_API_ENDPOINTS } from './config';
import { User } from '@/types/user';
import { JsonApiResponse, extractSingle } from './jsonApiClient';

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
    const json = await apiRequest<JsonApiResponse<User>>(SG_API_ENDPOINTS.userById(id));
    return extractSingle<User>(json);
}