import * as imageRecordRepository from "../repositories/image/imageRecord.js";
import * as imageFileRepository from "../repositories/image/imageFile.js";

// 画像の登録
export async function createImage(file) {
  const id = await imageRecordRepository.createRecord();
  if (id.isFailure()) {
    return id;
  }

  const saving = await imageFileRepository.saveImage(id.data, file);
  if (saving.isFailure()) {
    // ファイル保存に失敗した場合、作成したDBレコードを削除
    await imageRecordRepository.deleteRecord({ imageId: id.data });
    return saving;
  }
  return id;
}

//画像の取得
export async function getImage(id) {
  return await imageFileRepository.findImage(id);
}

//画像の削除
export async function deleteImage(id) {
  const filePath = await imageFileRepository.findImage(id);
  if (filePath.isFailure()) {
    return filePath;
  }

  const deleting = await imageRecordRepository.deleteRecord(id);
  if (deleting.isFailure()) {
    return deleting;
  }
  return await imageFileRepository.removeImage(filePath.data);
}
