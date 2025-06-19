import type { components } from '@/types/api.ts';

import { endpoint, extractIdFromLocation } from '@/api/utils.ts';

type Category = components['schemas']['Category'];
type CreateCategoryPayload = components['schemas']['CreateCategoryPayload'];
type UpdateCategoryPayload = components['schemas']['UpdateCategoryPayload'];
type WorkListItem = components['schemas']['WorkListItem'];

export async function createCategory(payload: CreateCategoryPayload): Promise<number | null> {
  const path = endpoint('/categories');
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return extractIdFromLocation(response, '/categories/([0-9]+)');
}

export async function getCategories(): Promise<Category[]> {
  const path = endpoint('/categories')
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function getCategory(id: number): Promise<Category> {
  const path = endpoint('/categories/{categoryId}')
    .replace('{categoryId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function updateCategory(id: number, payload: UpdateCategoryPayload): Promise<void> {
  const path = endpoint('/categories/{categoryId}')
    .replace('{categoryId}', String(id));
  await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(id: number): Promise<void> {
  const path = endpoint('/categories/{categoryId}')
    .replace('{categoryId}', String(id));
  await fetch(path, { method: 'DELETE' });
}

export async function getCategoryWorks(id: number): Promise<WorkListItem[]> {
  const path = endpoint('/categories/{categoryId}/works')
    .replace('{categoryId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}
