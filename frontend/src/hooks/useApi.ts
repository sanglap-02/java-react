import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import api from '@services/api';
import type { ApiResponse } from '@/types/api.types';
import { AxiosError } from 'axios';

export function useGet<T>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>, AxiosError>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<ApiResponse<T>, AxiosError>({
    queryKey: key,
    queryFn: () => api.get<ApiResponse<T>>(url).then((r) => r.data),
    ...options,
  });
}

export function usePost<TData, TVariables>(
  url: string,
  options?: UseMutationOptions<ApiResponse<TData>, AxiosError, TVariables>,
) {
  return useMutation<ApiResponse<TData>, AxiosError, TVariables>({
    mutationFn: (variables) => api.post<ApiResponse<TData>>(url, variables).then((r) => r.data),
    ...options,
  });
}

export function usePut<TData, TVariables>(
  url: string,
  options?: UseMutationOptions<ApiResponse<TData>, AxiosError, TVariables>,
) {
  return useMutation<ApiResponse<TData>, AxiosError, TVariables>({
    mutationFn: (variables) => api.put<ApiResponse<TData>>(url, variables).then((r) => r.data),
    ...options,
  });
}

export function useDelete<TData>(
  url: string,
  options?: UseMutationOptions<ApiResponse<TData>, AxiosError, void>,
) {
  return useMutation<ApiResponse<TData>, AxiosError, void>({
    mutationFn: () => api.delete<ApiResponse<TData>>(url).then((r) => r.data),
    ...options,
  });
}
