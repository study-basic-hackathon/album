import { updateWork as updateWorkRepo } from '../repositories/work.js';

// 作品の更新
export async function updateWork(workId, title, arranger_id, material_ids, season_id, category_id, image_ids) {
    const result = await updateWorkRepo(workId, title, arranger_id, material_ids, season_id, category_id, image_ids);
    return result;
}