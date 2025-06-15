import { endpoint } from '@/api/utils.ts';

export async function uploadImage(file: File): Promise<string> {
  const path = endpoint('/images');
  const data = new FormData();
  data.append('file', file);

  const response = await fetch(path, {
    method: 'POST',
    body: data
  });
  const headers = response.headers;
  const location = headers.get('Location') ?? '';
  const matches = location.match(/\/images\/([0-9]+)/);
  const id = matches ? matches[1] : '';
  return id;
}

export async function deleteImage(id: number): Promise<void> {
  const path = endpoint('/images/{imageId}')
    .replace('{imageId}', String(id));
  await fetch(path, { method: 'DELETE' });
}

export function buildImageUrl (id: number): string {
  const imageUrl = endpoint('/images/{imageId}')
    .replace('{imageId}', String(id));
  return imageUrl;
}
