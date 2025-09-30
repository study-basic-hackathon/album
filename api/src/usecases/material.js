import {
  findMaterialById,
  findWorksByMaterialId,
  insertMaterial
} from '../repositories/material.js';
import * as materialRepository from '../repositories/material.js';

// 花材の登録
export async function createMaterial(payloadResult) {
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  return await insertMaterial(payloadResult);
};

// 花材の情報の取得
export async function getMaterialById(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findMaterialById(idResult);
};

// 花材の作品一覧の取得
export async function getMaterialWorks(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findWorksByMaterialId(idResult);
};

// 花材の特定の作品の取得
export async function getMaterialWorkById(idsResult) {
  if (idsResult.isFailure()) {
    return idsResult;
  }
  const workListResult = await findWorksByMaterialId(idsResult);

  if(workListResult.isFailure()) {
    return workListResult;
  }
  return await materialRepository.getWork(workListResult, idsResult);
}


// 花材の更新
export async function updateMaterial(idResult, payloadResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  const exsitingResult = await materialRepository.ensureRecordExists(idResult);
  if (exsitingResult.isFailure()) {
    return exsitingResult;
  }
  return await materialRepository.updateMaterial(idResult, payloadResult);
};

// 花材の削除
export async function deleteMaterial(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  const exsitingResult = await materialRepository.ensureRecordExists(idResult);
  if (exsitingResult.isFailure()) {
    return exsitingResult;
  }
  return await materialRepository.deleteMaterial(idResult);
}