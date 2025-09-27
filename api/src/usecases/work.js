import * as workRepository from '../repositories/work.js';

// 作品の登録
export async function createWork(payloadResult) {
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  return await workRepository.insertWork(payloadResult);
}

// 作品の更新
export async function updateWork(idResult, payloadResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  const exsistingResult = await workRepository.ensureRecordExists(idResult);
  if (exsistingResult.isFailure()) {
    return exsistingResult;
  }
  return await workRepository.updateWork(idResult, payloadResult);
}

// 作品の削除
export async function deleteWork(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  const exsistingResult = await workRepository.ensureRecordExists(idResult);
  if (exsistingResult.isFailure()) {
    return exsistingResult;
  }
  return await workRepository.deleteWork(idResult);
}