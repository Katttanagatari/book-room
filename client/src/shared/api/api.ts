const BASE_URL = "/api/v1";

interface ApiError extends Error {
  status: number;
  code?: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };

  if (options?.body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    const error = new Error(
      errorData?.error?.message || "Произошла ошибка",
    ) as ApiError;

    error.status = response.status;
    error.code = errorData?.error?.code;
    throw error;
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export default apiFetch;
