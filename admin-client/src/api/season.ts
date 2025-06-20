import type { components } from '@/types/api.ts';

import { endpoint, extractIdFromLocation } from '@/api/utils.ts';

type Season = components['schemas']['Season'];
type CreateSeasonPayload = components['schemas']['CreateSeasonPayload'];
type UpdateSeasonPayload = components['schemas']['UpdateSeasonPayload'];
type WorkListItem = components['schemas']['WorkListItem'];

export async function createSeason(payload: CreateSeasonPayload): Promise<number | null> {
  const path = endpoint('/seasons');
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return extractIdFromLocation(response, '/seasons/([0-9]+)');
}

export async function getSeasons(): Promise<Season[]> {
  const path = endpoint('/seasons')
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function getSeason(id: number): Promise<Season> {
  const path = endpoint('/seasons/{seasonId}')
    .replace('{seasonId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}

export async function updateSeason(id: number, payload: UpdateSeasonPayload): Promise<void> {
  const path = endpoint('/seasons/{seasonId}')
    .replace('{seasonId}', String(id));
  await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteSeason(id: number): Promise<void> {
  const path = endpoint('/seasons/{seasonId}')
    .replace('{seasonId}', String(id));
  await fetch(path, { method: 'DELETE' });
}

export async function getSeasonWorks(id: number): Promise<WorkListItem[]> {
  const path = endpoint('/seasons/{seasonId}/works')
    .replace('{seasonId}', String(id));
  const response = await fetch(path, { method: 'GET' });
  return response.json();
}
