import axios from 'axios';

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Cannot reach the backend. Check that the server is running.';
    }

    const message = error.response.data?.error?.message;

    if (typeof message === 'string') {
      return message;
    }

    return 'The request could not be completed.';
  }

  return 'An unexpected error occurred.';
}

// const API_BASE_URL = (
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1"
// ).replace(/\/+$/, "");

// interface ApiErrorBody {
//   error?: {
//     code?: string;
//     message?: string;
//   };
// }

// export class ApiError extends Error {
//   public readonly status: number;
//   public readonly code?: string;

//   constructor(message: string, status: number, code?: string) {
//     super(message);

//     this.name = 'ApiError';
//     this.status = status;
//     this.code = code;
//   }
// }

// export async function apiRequest<T>(
//   path: string,
//   init?: RequestInit,
// ): Promise<T> {
//   let response: Response;

//   try {
//     response = await fetch(`${API_BASE_URL}${path}`, {
//       ...init,
//       headers: {
//         Accept: "application/json",
//         ...(init?.body ? { "Content-Type": "application/json" } : {}),
//         ...init?.headers,
//       },
//     });
//   } catch {
//     throw new ApiError(
//       'Unable to reach the Resolve AI backend. Check that the server is running.',
//       0,
//       'NETWORK_ERROR'
//     );
//   }

//   if (!response.ok) {
//     let errorBody: ApiErrorBody = {};

//     try {
//       errorBody = (await response.json()) as ApiErrorBody;
//     } catch {
//       // The server did not return a JSON error body.
//     }

//     throw new ApiError(
//       errorBody.error?.message || 'The request could not be completed.',
//       response.status,
//       errorBody.error?.code
//     );
//   }

//   return (await response.json()) as T;
// }
