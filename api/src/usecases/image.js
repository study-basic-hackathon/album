import { findImageById } from '../repositories/image.js';

export async function getImageById(imageId) {
  const result = findImageById(imageId);
  return result; 
};