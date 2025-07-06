// 画像の削除
export const deleteImageResult = Object.freeze({
  success: Symbol('success'),
  noFile: Symbol('noFile'),
  noRecord: Symbol('noRecord'),
  rollbackError: Symbol('rollbackError'),
});
