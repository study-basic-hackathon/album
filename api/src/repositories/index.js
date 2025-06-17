import { pool } from "../db.js";

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