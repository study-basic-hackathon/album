import {
  findAllExhibitions,
  insertExhibition,
  findExhibitionById,
  findWorksByExhibitionId,
} from "../repositories/exhibition.js";
import * as exhibitionRepository from "../repositories/exhibition.js";

// 華展の一覧
export async function getExhibitions() {
   return await findAllExhibitions();
}

// 華展の登録
export async function createExhibition(payloadResult) {
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  return await insertExhibition(payloadResult);
}

// 華展の取得
export async function getExhibitionById(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findExhibitionById(idResult);
}

// 華展の作品一覧の取得
export async function getExhibitionWorks(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findWorksByExhibitionId(idResult);
}

// 華展の特定の作品の取得
export async function getExhibitionWorkById(idsResult) {
  if (idsResult.isFailure()) {
    return idsResult;
  }
  const workListResult = await findWorksByExhibitionId(idsResult);

  if(workListResult.isFailure()) {
    return workListResult;
  }
  return await exhibitionRepository.getWork(workListResult, idsResult);
}

// 華展の更新
export async function updateExhibition(idResult, payloadResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  const exsitingResult = await exhibitionRepository.ensureRecordExists(idResult);
  if (exsitingResult.isFailure()) {
    return exsitingResult;
  }
   return await exhibitionRepository.updateExhibition(idResult, payloadResult);
}

// 華展の削除
export async function deleteExhibition(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  const exsitingResult = await exhibitionRepository.ensureRecordExists(idResult);
  if (exsitingResult.isFailure()) {
    return exsitingResult;
  }
  return await exhibitionRepository.deleteExhibition(idResult);
}
