import { pool } from "../db.js";

async function findWorksByCondition({ whereClause, whereParams, orderByClause }) {
try {
    if (!Array.isArray(whereParams)) {
      throw new Error("whereParams not array");
    };
    const baseQuery = `
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE 
        ${whereClause}
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ${orderByClause ? `ORDER BY ${orderByClause}` : ''}
    `;
    const result = await pool.query(baseQuery, whereParams);
    return result;
} catch(err) {
    console.error("Error in findWorksByCondition:", err.message);
    throw err;
  };
};

export { findWorksByCondition };