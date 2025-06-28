import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

//花材の登録
export async function postMaterialByName(name) {
  const result = await pool.query(
    `
    INSERT INTO
       material (name)
     VALUES
       ($1)
     RETURNING
       id
    `,
    [name]
  );
  return result.rows;
}

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

// 花材の削除
export async function deleteMaterial(materialId) {        
  const result = await pool.query(`
    DELETE FROM
      material
    WHERE
      id = $1
      `, 
    [materialId]
  );
  return result.rowCount > 0;
}
