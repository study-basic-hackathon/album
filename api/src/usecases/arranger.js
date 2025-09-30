import {
  findArrangerById,
  findWorksByArrangerId,
  insertArranger,
} from "../repositories/arranger.js";
import * as arrangerRepository from "../repositories/arranger.js";

// 作者の登録
export async function createArranger(payloadResult) {
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  return await insertArranger(payloadResult);
}

// 作者の情報の取得
export async function getArrangerById(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findArrangerById(idResult);
}

// 作者の作品一覧の取得
export async function getArrangerWorks(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findWorksByArrangerId(idResult);
}

// 作者の特定の作品の取得
export async function getArrangerWorkById(idsResult) {
  if (idsResult.isFailure()) {
    return idsResult;
  }
  const workListResult = await findWorksByArrangerId(idsResult);

  if (workListResult.isFailure()) {
    return workListResult;
  }
  return await arrangerRepository.getWork(workListResult, idsResult);
}

// 作者の更新
export async function updateArranger(idResult, payloadResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  const exsitingResult = await arrangerRepository.ensureRecordExists(idResult);
  if (exsitingResult.isFailure()) {
    return exsitingResult;
  }
  return await arrangerRepository.updateArranger(idResult, payloadResult);
}

// 作者の削除
export async function deleteArranger(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  const exsitingResult = await arrangerRepository.ensureRecordExists(idResult);
  if (exsitingResult.isFailure()) {
    return exsitingResult;
  }
  return await arrangerRepository.deleteArranger(idResult);
}
