import * as workRepository from "../repositories/work.js";

// 作品の登録
export async function createWork(payload) {
  return await workRepository.createWork(payload);
}

// 作品の更新
export async function updateWork(id, payload) {
  const existing = await workRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await workRepository.updateWork(id, payload);
}

// 作品の削除
export async function deleteWork(id) {
  const existing = await workRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await workRepository.deleteWork(id);
}
