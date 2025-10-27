import * as materialRepository from "../repositories/material.js";

// 花材の登録
export async function createMaterial(payload) {
  return await materialRepository.createMaterial(payload);
}

// 花材の情報の取得
export async function getMaterialById(id) {
  return await materialRepository.findMaterial(id);
}

// 花材の作品一覧の取得
export async function getMaterialWorks(id) {
  return await materialRepository.findWorks(id);
}

// 花材の特定の作品の取得
export async function getMaterialWorkById(ids) {
  const materialWorks = await materialRepository.findWorks(ids);

  if (materialWorks.isFailure()) {
    return materialWorks;
  }
  return await materialRepository.findWork(materialWorks.data, ids);
}

// 花材の更新
export async function updateMaterial(id, payload) {
  const existing = await materialRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await materialRepository.updateMaterial(id, payload);
}

// 花材の削除
export async function deleteMaterial(id) {
  const existing = await materialRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await materialRepository.deleteMaterial(id);
}
