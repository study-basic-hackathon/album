import { findPutArranger } from '../repositories/putArranger.js';

// 作者の更新
export async function putArranger(arrangerId, name) {
  const result = await findPutArranger(arrangerId, name);
  return result[0];
};
