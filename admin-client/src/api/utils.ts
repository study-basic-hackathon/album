import type { paths } from '@/types/api.ts';

type Path = keyof paths;

export function endpoint (path: Path): string {
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}

export function extractIdFromLocation(
  response: Response,
  pattern: string
): number | null {
  const location = response.headers.get('Location') ?? '';
  const regExp = new RegExp(pattern);
  const matches = location.match(regExp);
  const value = matches ? matches[1] : null;
  return value ? parseInt(value, 10) : null;
}
