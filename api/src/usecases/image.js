import { findImageById } from '../repositories/image.js';

//画像の取得
export async function getImageById(imageId) {
  const result = findImageById(imageId);
  return result; 
};