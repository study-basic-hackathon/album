import { putMaterial } from '../repositories/putMaterial.js';

// 花材の更新
export async function putMaterial(materialId, name) {
  const result = await putMaterial(materialId, name);
  return result[0];
};
