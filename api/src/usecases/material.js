import { findMaterialById, findWorksByMaterialId } from '../repositories/material.js';

// 花材の情報の取得
export async function getMaterialById(materialId) {
  const result = await findMaterialById(materialId);
  return result[0];
};

// 花材の作品一覧の取得
export async function getMaterialWorks(materialId) {
  const result = await findWorksByMaterialId(materialId);
  return result;
};

// 花材の特定の作品の取得
export async function getMaterialWorkById(materialId, workId) {
  const targetWorkId = parseInt(workId, 10);
  const formattedWorks = await findWorksByMaterialId(materialId);
  const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
  return foundWork[0];
};