import { pool } from "../db.js";

// 作品の更新
export async function updateWorkBase(workId, title, arranger_id, season_id, category_id) {
    const result = await pool.query(`
        UPDATE 
            work
        SET
            title = $2,
            arranger_id = $3,
            season_id = $4,
            category_id = $5
        WHERE
            id = $1
        `,  
        [workId, title, arranger_id, season_id, category_id]
    );
    return result.rows;
};

export async function updateWorkMaterials(workId, material_ids) {
    await pool.query(`DELETE FROM work_material WHERE work_id = $1`, [workId]);
    for (const materialId of material_ids) {
        await pool.query(
            `INSERT INTO work_material (work_id, material_id) VALUES ($1, $2)`,
            [workId, materialId]
        );
    }
}

export async function updateWorkImages(workId, image_ids) {
    await pool.query(`UPDATE image SET work_id = NULL WHERE work_id = $1`, [workId]);
    if (image_ids.length > 0) {
        await pool.query(`UPDATE image SET work_id = $1 WHERE id = ANY($2)`, [workId, image_ids]);
    }
}

export async function updateWork(
    workId,
    title,
    arranger_id,
    material_ids,
    season_id,
    category_id,
    image_ids
) {
    const result = await updateWorkBase(workId, title, arranger_id, season_id, category_id);
    await updateWorkMaterials(workId, material_ids);
    await updateWorkImages(workId, image_ids); 
    return result;
}