import { type paths } from "../types/api";

export function endpoint(path: keyof paths): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
  return `${baseUrl}${path}`;
}
