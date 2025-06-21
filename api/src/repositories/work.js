import { pool } from "../db.js";

export async function updateWork(workId, title, arranger_id, season_id, category_id ) {
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
        RETURNING 
            *
        `,  
        [workId, title, arranger_id, season_id, category_id ]
    );
    return result.rows;
};

// export async function findWorksByMaterialId(materialId) {
//     const result = await pool.query(`
//         SELECT
//             wk.id,
//             wk.title,
//             wk.arranger_id,
//             wk.material_id,
//             wk.season_id,
//             wk.category_id,
//             TO_CHAR(wk.created_at, 'YYYY-MM-DD') AS created_at
//         FROM
//             work AS wk
//         JOIN
//             work_material AS wm ON wk.id = wm.work_id
//         WHERE
//             wm.material_id = $1
//         ORDER BY
//             wk.created_at ASC`, 
//         [materialId]
//     );
//     return result.rows;
// }{