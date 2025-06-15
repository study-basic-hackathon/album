import type { components } from '@/types/api.ts';

import { endpoint, extractIdFromLocation } from '@/api/utils.ts';

type Exhibition = components['schemas']['Exhibition'];
type CreateExhibitionPayload = components['schemas']['CreateExhibitionPayload'];
type UpdateExhibitionPayload = components['schemas']['UpdateExhibitionPayload'];
type WorkListItem = components['schemas']['WorkListItem'];

export async function createExhibition(payload: CreateExhibitionPayload): Promise<string> {
  const path = endpoint('/exhibitions');
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return extractIdFromLocation(response, '/exhibitions/([0-9]+)');
}

export async function getExhibitions(): Promise<Exhibition[]> {
  const path = endpoint('/exhibitions')
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function getExhibition(id: number): Promise<Exhibition> {
  const path = endpoint('/exhibitions/{exhibitionId}')
    .replace('{exhibitionId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function updateExhibition(id: number, payload: UpdateExhibitionPayload): Promise<void> {
  const path = endpoint('/exhibitions/{exhibitionId}')
    .replace('{exhibitionId}', String(id));
  await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteExhibition(id: number): Promise<void> {
  const path = endpoint('/exhibitions/{exhibitionId}')
    .replace('{exhibitionId}', String(id));
  await fetch(path, { method: 'DELETE' });
}

export async function getExhibitionWorks(id: number): Promise<WorkListItem[]> {
  const path = endpoint('/exhibitions/{exhibitionId}/works')
    .replace('{exhibitionId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}
