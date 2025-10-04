import { pool } from "../db.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getWorkListByCondition } from "./utils/getWorkListByCondition.js";

//作者の登録
export async function createArranger(payload) {
  try {
    const { name } = payload;
    const result = await pool.query(
      `
      INSERT INTO arranger (name)
      VALUES ($1)
      RETURNING id`,
      [name]
    );
    return Result.ok(result.rows[0].id);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 作者の取得
export async function findArranger(id) {
  try {
    const { arrangerId } = id;
    const result = await pool.query(
      `
      SELECT *
      FROM arranger
      WHERE id = $1`,
      [arrangerId]
    );
    if (!result.rows[0]) {
      return Result.fail(AppError.notFound("Arranger not found"));
    }
    return Result.ok(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 作者の作品一覧の取得
export async function findWorks(id) {
  try {
    const { arrangerId } = id;
    const works = await getWorkListByCondition({
      where: "wk.arranger_id = $1",
      params: [arrangerId],
      orderBy: "wk.created_at ASC",
    });
    if (!works || works.length === 0) {
      return Result.fail(AppError.notFound("arrangerWork not found"));
    }
    return Result.ok(works);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 作者の特定の作品の取得
export async function findWork(works, ids) {
  try {
    const { workId } = ids;
    const work = works.find((item) => String(item.work.id) === workId);
    if (!work) {
      return Result.fail(AppError.notFound("arrangerWork not found"));
    }
    return Result.ok(work);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 作者の存在確認
export async function ensureRecord(id) {
  try {
    const { arrangerId } = id;
    const result = await pool.query(
      `
      SELECT COUNT(*)
      FROM arranger WHERE id = $1`,
      [arrangerId]
    );
    const count = parseInt(result.rows[0].count, 10);
    if (count === 0) {
      return Result.fail(AppError.notFound("Arranger not found"));
    }
    return Result.ok();
  } catch (error) {
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  }
}

// 作者の更新
export async function updateArranger(id, payload) {
  try {
    const { arrangerId } = id;
    const { name } = payload;
    await pool.query(
      `
      UPDATE arranger
      SET name = $2
      WHERE id = $1 `,
      [arrangerId, name]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 作者の削除
export async function deleteArranger(id) {
  try {
    const { arrangerId } = id;
    await pool.query(
      `
      DELETE FROM arranger
      WHERE id = $1`,
      [arrangerId]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}
