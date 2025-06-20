import type { components } from '@/types/api.ts';

import { endpoint, extractIdFromLocation } from '@/api/utils.ts';

type Material = components['schemas']['Material'];
type CreateMaterialPayload = components['schemas']['CreateMaterialPayload'];
type UpdateMaterialPayload = components['schemas']['UpdateMaterialPayload'];
type WorkListItem = components['schemas']['WorkListItem'];

export async function createMaterial(payload: CreateMaterialPayload): Promise<number | null> {
  const path = endpoint('/materials');
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return extractIdFromLocation(response, '/materials/([0-9]+)');
}

export async function getMaterials(): Promise<Material[]> {
  const path = endpoint('/materials')
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function getMaterial(id: number): Promise<Material> {
  const path = endpoint('/materials/{materialId}')
    .replace('{materialId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function updateMaterial(id: number, payload: UpdateMaterialPayload): Promise<void> {
  const path = endpoint('/materials/{materialId}')
    .replace('{materialId}', String(id));
  await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteMaterial(id: number): Promise<void> {
  const path = endpoint('/materials/{materialId}')
    .replace('{materialId}', String(id));
  await fetch(path, { method: 'DELETE' });
}

export async function getMaterialWorks(id: number): Promise<WorkListItem[]> {
  const path = endpoint('/materials/{materialId}/works')
    .replace('{materialId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}
