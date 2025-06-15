import type { components } from '@/types/api.ts';

import { endpoint, extractIdFromLocation } from '@/api/utils.ts';

type Arranger = components['schemas']['Arranger'];
type CreateArrangerPayload = components['schemas']['CreateArrangerPayload'];
type UpdateArrangerPayload = components['schemas']['UpdateArrangerPayload'];
type WorkListItem = components['schemas']['WorkListItem'];

export async function createArranger(payload: CreateArrangerPayload): Promise<string> {
  const path = endpoint('/arrangers');
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return extractIdFromLocation(response, '/arrangers/([0-9]+)');
}

export async function getArrangers(): Promise<Arranger[]> {
  const path = endpoint('/arrangers')
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function getArranger(id: number): Promise<Arranger> {
  const path = endpoint('/arrangers/{arrangerId}')
    .replace('{arrangerId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function updateArranger(id: number, payload: UpdateArrangerPayload): Promise<void> {
  const path = endpoint('/arrangers/{arrangerId}')
    .replace('{arrangerId}', String(id));
  await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteArranger(id: number): Promise<void> {
  const path = endpoint('/arrangers/{arrangerId}')
    .replace('{arrangerId}', String(id));
  await fetch(path, { method: 'DELETE' });
}

export async function getArrangerWorks(id: number): Promise<WorkListItem[]> {
  const path = endpoint('/arrangers/{arrangerId}/works')
    .replace('{arrangerId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}
