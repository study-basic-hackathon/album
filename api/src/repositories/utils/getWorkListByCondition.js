import { pool } from "../../db.js";

export async function getWorkListByCondition({ where, params, orderBy }) {
  const result = await pool.query(buildSql(where, orderBy), params);
  return attachNavigation(result.rows);
}

function buildSql(where, orderBy) {
  return `
    SELECT
      wk.id,
      wk.title,
      wk.exhibition_id,
      wk.arranger_id,
      ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
      wk.category_id,
      wk.season_id,
      ARRAY_AGG(DISTINCT wi.image_id) AS image_ids,
      TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
    FROM work AS wk
    LEFT JOIN work_material AS wm ON wk.id = wm.work_id
    LEFT JOIN work_image AS wi ON wk.id = wi.work_id
    WHERE ${where}
    GROUP BY wk.id, wk.title, wk.exhibition_id, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
    ORDER BY ${orderBy}
  `;
}

function attachNavigation(works) {
  return works.map((work, index) => ({
    work: {
      id: work.id,
      title: work.title,
      exhibition_id: work.exhibition_id,
      arranger_id: work.arranger_id,
      material_ids: work.material_ids,
      season_id: work.season_id,
      category_id: work.category_id,
      image_ids: work.image_ids,
      created_at: work.created_at,
    },
    navigation: {
      previous: index > 0 ? works[index - 1].id : null,
      next: index < works.length - 1 ? works[index + 1].id : null,
    },
  }));
}
