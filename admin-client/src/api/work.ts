import type { components } from '@/types/api.ts';

import { endpoint, extractIdFromLocation } from '@/api/utils.ts';

type Work = components['schemas']['Work'];
type CreateWorkPayload = components['schemas']['CreateWorkPayload'];
type UpdateWorkPayload = components['schemas']['UpdateWorkPayload'];

export async function createWork(payload: CreateWorkPayload): Promise<number | null> {
  const path = endpoint('/works');
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return extractIdFromLocation(response, '/works/([0-9]+)');
}

export async function getWork(id: number): Promise<Work> {
  const path = endpoint('/works/{workId}')
    .replace('{workId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function updateWork(id: number, payload: UpdateWorkPayload): Promise<void> {
  const path = endpoint('/works/{workId}')
    .replace('{workId}', String(id));
  await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteWork(id: number): Promise<void> {
  const path = endpoint('/works/{workId}')
    .replace('{workId}', String(id));
  await fetch(path, { method: 'DELETE' });
}
