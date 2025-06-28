import { postWork } from '../repositories/work.js';
import * as workRepository from '../repositories/work.js';

// 作品の登録
export async function getWorkPath(title, arranger_id, material_ids, season_id, category_id, image_ids) {
    const resultRows = await postWork(title, arranger_id, material_ids, season_id, category_id, image_ids);
    const workId = resultRows[0].id;
    const path = `/works/${workId}`;
    return path;
}

// 作品の更新
export async function updateWork(workId, title, arranger_id, material_ids, season_id, category_id, image_ids) {
    const result = await updateWork(workId, title, arranger_id, material_ids, season_id, category_id, image_ids);
    return result;
}

// 作品の削除
export async function deleteWork(workId) {
    const result = await workRepository.deleteWork(workId);
    return result;
}