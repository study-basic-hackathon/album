import { pool } from "../db.js";

export async function findWorksByCondition({ whereClause, whereParams, orderByClause }) {
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
    ${orderByClause ? `ORDER BY ${orderByClause}` : ''}`;

  const result = await pool.query(baseQuery, whereParams);
  return result.rows;
};

export async function findAllExhibitions() {
    const result = await pool.query(`
      SELECT
        id,
        name,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS started_date,
        TO_CHAR(ended_date, 'YYYY-MM-DD') AS ended_date
      FROM
        exhibition
      ORDER BY
        started_date DESC`
    );
    return result.rows;
};

export async function findExhibitionById(exhibitionId) {
    const result = await pool.query(`
      SELECT
        id,
        name,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS started_date,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS ended_date
      FROM
        exhibition
      WHERE
        id = $1`,
      [exhibitionId]
    );
    return result.rows;
};

export async function findArrangerById(arrangerId) {
    const result = await pool.query(`
      SELECT
        * 
      FROM
        arranger
      WHERE
        id = $1
        `, 
      [arrangerId]
    );
    return result.rows;
};

export async function findCategoryById(categoryId) {
    const result = await pool.query(`
      SELECT
        * 
      FROM
        category
      WHERE
        id = $1
        `, 
      [categoryId]
    );
    return result.rows;
};

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

export async function findSeasonById(seasonId) {
    const result = await pool.query(`
      SELECT
        * 
      FROM
        season
      WHERE
        id = $1
        `, 
      [seasonId]
    );
    return result.rows;
};