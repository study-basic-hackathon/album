import { type paths } from '../types/api';
import { endpoint } from './util';

export async function listExihibitions (): Promise<paths['/exhibitions']['get']['responses']['200']['content']['application/json']> {
  const response = await fetch(endpoint('/exhibitions'));
  if (!response.ok) {
    throw new Error('Failed to fetch exhibitions');
  }
  return response.json();
}
