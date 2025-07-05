import { findImageById, insertImage } from '../repositories/image.js';

//画像の登録
export async function createImage() {
  const resultRows = await insertImage();
  const imageId = resultRows[0].id;
  return imageId;
};

//画像の取得
export async function getImageById(imageId) {
  const result = findImageById(imageId);
  return result; 
};