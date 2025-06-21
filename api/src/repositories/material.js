import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

export async function findMaterialById(materialId) {
    const result = await pool.query(`
      SELECT
        * 
      FROM
        material
      WHERE
        id = $1
        `, 
      [materialId]
    );
    return result.rows;
};

export async function findWorksByMaterialId(materialId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wm.material_id = $1",
    whereParams: [materialId],
    orderByClause: "wk.created_at ASC"
  });
  return result;
};

// 花材の更新
export async function updateMaterial(materialId, name) {
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
