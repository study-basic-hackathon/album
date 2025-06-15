import { type paths } from "@/types/api";

export function endpoint(path: keyof paths): string {
  const parameterReplaced = path.replace(/\{([^}]+)\}/g, ":$1");
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "/";
  return `${baseUrl}${parameterReplaced}`;
}
