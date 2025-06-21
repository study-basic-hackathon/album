import * as workRepository from '../repositories/work.js';

// 作品の更新
export async function updateWork(workId, title, arrangerId, materialId, season, categoryId, imageIds) {
    const result = await workRepository.updateWork(workId, title, arrangerId, materialId, season, categoryId, imageIds);
    return result;
}