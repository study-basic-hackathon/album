import { findMaterialById, findWorksByMaterialId, postMaterialByName } from '../repositories/material.js';
import * as materialRepository from '../repositories/material.js';

//作者の登録
export async function getMaterialPath(name) {
  const resultRows = await postMaterialByName(name);
  const materialId = resultRows[0].id;
  const path = `/materials/${materialId}`;
  return path;
};

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

// 花材の更新
export async function updateMaterial(materialId, name) {
  const result = await materialRepository.updateMaterial(materialId, name);
  return result[0];
};

// 花材の削除
export async function deleteMaterial(materialId) {      
  const result = await materialRepository.deleteMaterial(materialId);
  return result;
}