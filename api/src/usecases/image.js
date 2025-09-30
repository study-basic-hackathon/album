import * as imageRepository from "../repositories/image.js"

// 画像の登録
export async function createImage(fileResult) {
  if (fileResult.isFailure()) {
    return fileResult;
  }
  const idResult = await imageRepository.insertRecord();
  if (idResult.isFailure()) {
    return idResult;
  }

  const saveResult = await imageRepository.saveFile(idResult, fileResult);
  if (saveResult.isFailure()) {
    return saveResult;
  }
  return idResult;
}

//画像の取得
export async function getImage(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await imageRepository.findById(idResult);
}

//画像の削除
export async function deleteImage(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  const pathResult = await imageRepository.findById(idResult);
  if (pathResult.isFailure()) {
    return pathResult;
  }

  const deleteRecordResult = await imageRepository.deleteRecord(idResult);
  if (deleteRecordResult.isFailure()) {
    return deleteRecordResult;
  }
  return await imageRepository.deleteFile(pathResult);
}
