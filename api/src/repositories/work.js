import { pool } from "../db.js";

export async function updateWork(workId, title, arrangerId, materialId, season, categoryId, imageIds) {
    const result = await pool.query(`
        UPDATE 
            work
        SET
            title = $2,
            arrenger_id = $3,
            material_id = $4,
            season = $5,
            category_id = $6,
            image_ides = $7
        WHERE
            id = $1
        RETURNING 
            *
        `,  
        [workId, title, arrangerId, materialId, season, categoryId, imageIds]
    );
    return result.rows;
};