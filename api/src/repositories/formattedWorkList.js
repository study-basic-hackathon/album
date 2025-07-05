import { pool } from "../db.js";

export async function getFormattedWorkListByCondition({ whereClause, whereParams, orderByClause }) {
  const baseQuery = `
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
    FROM
      work AS wk
    LEFT JOIN
      work_material AS wm ON wk.id = wm.work_id
    LEFT JOIN
      work_image AS wi ON wk.id = wi.work_id
    WHERE
      ${whereClause}
    GROUP BY
      wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
    ORDER BY
      ${orderByClause}
    `;
  const result = await pool.query(baseQuery, whereParams);
  const formattedResult = await formatWorksWithNavigation(result.rows);
  return formattedResult;
}

async function formatWorksWithNavigation(works) {
  const formattedResult = works.map((work, index) => {
    let previousWorkId = null;
    let nextWorkId = null;

    if (index > 0) {
      previousWorkId = works[index - 1].id;
    };

    if (index < works.length - 1) {
      nextWorkId = works[index + 1].id;
    };

    return {
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
        previous: previousWorkId,
        next: nextWorkId,
      },
    };
  });

  return formattedResult;
};