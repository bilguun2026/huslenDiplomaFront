// services/crudService.ts
import axiosInstance from "@/lib/api";
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
  payload: Partial<T> | FormData,
  isMultipart: boolean = false
): Promise<T> => {
  const config = isMultipart
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : { headers: { "Content-Type": "application/json" } };

  const { data } = await api.post<T>(endpoint, payload, config);
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

export const updateOneProfile = async <T>(
  endpoint: string,
  id: number,
  data: Partial<T>
): Promise<T> => {
  let body: FormData | Partial<T>;
  let isFormData = false;

  // Detect if file exists
  if (
    typeof window !== "undefined" &&
    typeof data === "object" &&
    data &&
    "user" in data &&
    "profile" in data &&
    (data as any).user?.profile_picture instanceof File
  ) {
    const formData = new FormData();
    const { user, profile } = data as any;

    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("phone", user.phone || "");
    formData.append("address", user.address || "");
    if (user.profile_picture) {
      formData.append("profile_picture", user.profile_picture); // 👈 file append here
    }

    if (profile) {
      formData.append("store_name", profile.store_name || "");
      formData.append("bank_account", profile.bank_account || "");
      formData.append("description", profile.description || "");
    }

    body = formData;
    isFormData = true;
  } else {
    body = data;
  }

  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};

  const { data: res } = await axiosInstance.put<T>(
    `${endpoint}/${id}/`,
    body,
    config
  );
  return res;
};
