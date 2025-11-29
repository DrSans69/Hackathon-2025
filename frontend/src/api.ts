import type { AxiosError } from 'axios';
import axios from 'axios';
import { API_URL } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : API_URL,
});

/**
 * Normalize axios errors so callers can handle them consistently.
 * Returns a rejected promise with { status, message, data, original }.
 */
export function handleApiError(error: unknown) {
    const axiosError = error as AxiosError | undefined;
    const resp = axiosError?.response;
    const data = resp?.data ?? null;
    const status = resp?.status ?? null;

    // Prefer common server fields, fallback to axios message
    const message =
        (data &&
            typeof data === 'object' &&
            ('detail' in data || 'message' in data || 'error' in data) &&
            ((data as { detail?: string; message?: string; error?: string }).detail ||
                (data as { detail?: string; message?: string; error?: string }).message ||
                (data as { detail?: string; message?: string; error?: string }).error)) ||
        axiosError?.message ||
        'Unknown API error';

    // centralized logging
    //console.error("API error:", { status, message, data, original: error });
    // alert(`API error: status=${status}, message=${message}, data=${JSON.stringify(data)}, original=${error}`);
    alert(`Error: ${message}`);
    // return a normalized rejected value for callers
    return Promise.reject({ status, message, data, original: error });
}

// Attach response interceptor to centralize error normalization
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.config?.headers?.['X-Silent-Check'] === 'true') {
            return Promise.reject(error);
        }
        handleApiError(error);
    }
);

export default api;
