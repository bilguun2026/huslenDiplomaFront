// services/crudService.ts
import api from "@/lib/api";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getList = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<PaginatedResponse<T>> => {
  const { data } = await api.get<PaginatedResponse<T>>(endpoint, { params });
  return data;
};

export const getOne = async <T>(endpoint: string, id: number): Promise<T> => {
  const { data } = await api.get<T>(`${endpoint}/${id}/`);
  return data;
};

export const createOne = async <T>(
  endpoint: string,
  payload: Partial<T>
): Promise<T> => {
  const { data } = await api.post<T>(endpoint, payload);
  return data;
};

export const updateOne = async <T>(
  endpoint: string,
  id: number,
  payload: Partial<T>
): Promise<T> => {
  const { data } = await api.put<T>(`${endpoint}/${id}/`, payload);
  return data;
};

export const deleteOne = async (
  endpoint: string,
  id: number
): Promise<void> => {
  await api.delete(`${endpoint}/${id}/`);
};
