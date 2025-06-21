import { pool } from "../db.js";

// 花材の更新
export async function putMaterial(materialId, name) {
    const result = await pool.query(`
      UPDATE
        material
      SET
        name = $2
      WHERE
        id = $1
        `, 
      [materialId, name]
    );
    return result.rows;
};
