import { pool } from "../db.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getWorkListByCondition } from "./utils/getWorkListByCondition.js";

// 華展一覧の取得
export async function findAllExhibitions() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS started_date,
        TO_CHAR(ended_date, 'YYYY-MM-DD') AS ended_date
      FROM exhibition
      ORDER BY started_date DESC`);
    if (!result.rows[0]) {
      return Result.fail(AppError.notFound("Exhibitions not found"));
    }
    return Result.ok(result.rows);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

//華展の登録
export async function createExhibition(payload) {
  try {
    const { name, started_date, ended_date } = payload;
    const result = await pool.query(
      `
      INSERT INTO
        exhibition ( name, started_date, ended_date )
      VALUES ($1,$2,$3)
      RETURNING id`,
      [name, started_date, ended_date]
    );
    return Result.ok(result.rows[0].id);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

//華展の取得
export async function findExhibition(id) {
  try {
    const { exhibitionId } = id;
    const result = await pool.query(
      `
      SELECT
        id,
        name,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS started_date,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS ended_date
      FROM exhibition
      WHERE id = $1`,
      [exhibitionId]
    );
    if (!result.rows[0]) {
      return Result.fail(AppError.notFound("Exhibition not found"));
    }
    return Result.ok(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 華展の作品一覧の取得
export async function findWorks(id) {
  try {
    const { exhibitionId } = id;
    const works = await getWorkListByCondition({
      where: "wk.exhibition_id = $1",
      params: [exhibitionId],
      orderBy: "wk.created_at ASC",
    });
    if (!works || works.length === 0) {
      return Result.fail(AppError.notFound("exhibitionWork not found"));
    }
    return Result.ok(works);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 華展の特定の作品の取得
export async function findWork(works, ids) {
  try {
    const { workId } = ids;
    const work = works.find((item) => String(item.work.id) === workId);
    if (!work) {
      return Result.fail(AppError.notFound("exhibitionWork not found"));
    }
    return Result.ok(work);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 華展の存在確認
export async function ensureRecord(id) {
  try {
    const { exhibitionId } = id;
    const result = await pool.query(
      `
      SELECT COUNT(*)
      FROM exhibition WHERE id = $1`,
      [exhibitionId]
    );
    const count = parseInt(result.rows[0].count, 10);
    if (count === 0) {
      return Result.fail(AppError.notFound("Exhibition not found"));
    }
    return Result.ok();
  } catch (error) {
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  }
}

// 華展の更新
export async function updateExhibition(id, payload) {
  try {
    const { exhibitionId } = id;
    const { name, started_date, ended_date } = payload;
    await pool.query(
      `
      UPDATE
        exhibition
      SET
        name = $2,
        started_date = $3,
        ended_date = $4
      WHERE id = $1`,
      [exhibitionId, name, started_date, ended_date]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 華展の削除
export async function deleteExhibition(id) {
  try {
    const { exhibitionId } = id;
    await pool.query(
      `
      DELETE FROM exhibition
      WHERE id = $1`,
      [exhibitionId]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}
