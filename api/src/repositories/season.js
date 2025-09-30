import { pool } from "../db.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getWorkListByCondition } from "./utils/getWorkListByCondition.js";

//季節の登録
export async function insertSeason(payloadResult) {
  try {
    const { name } = payloadResult.data;
    const result = await pool.query(
      `
      INSERT INTO season (name)
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

// 季節の取得
export async function findSeasonById(idResult) {
  try {
    const { seasonId } = idResult.data;
    const result = await pool.query(
      `
      SELECT *
      FROM season
      WHERE id = $1`,
      [seasonId]
    );
    if (!result.rows[0]) {
      return Result.fail(AppError.notFound("Season not found"));
    }
    return Result.ok(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 季節の作品一覧の取得
export async function findWorksBySeasonId(idsResult) {
  try {
    const { seasonId } = idsResult.data;
    const workList = await getWorkListByCondition({
      where: "wk.season_id = $1",
      params: [seasonId],
      orderBy: "wk.created_at ASC",
    });
    if (!workList || workList.length === 0) {
      return Result.fail(AppError.notFound("seasonWork not found"));
    }
    return Result.ok(workList);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 季節の特定の作品の取得
export async function getWork(workListResult, idsResult) {
  try {
    const { workId } = idsResult.data;
    const workList = workListResult.data;
    const work = workList.find((item) => String(item.work.id) === workId);
    if (!work) {
      return Result.fail(AppError.notFound("seasonWork not found"));
    }
    return Result.ok(work);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 季節の存在確認
export async function ensureRecordExists(idResult) {
  try {
    const { seasonId } = idResult.data;
    const result = await pool.query(
      `
      SELECT COUNT(*)
      FROM season WHERE id = $1`,
      [seasonId]
    );
    const count = parseInt(result.rows[0].count, 10);
    if (count === 0) {
      return Result.fail(AppError.notFound("Season not found"));
    }
    return Result.ok();
  } catch (error) {
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  }
}

// 季節の更新
export async function updateSeason(idResult, payloadResult) {
  try {
    const { seasonId } = idResult.data;
    const { name } = payloadResult.data;
    await pool.query(
      `
      UPDATE season
      SET name = $2
      WHERE id = $1 `,
      [seasonId, name]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 季節の削除
export async function deleteSeason(idResult) {
  try {
    const { seasonId } = idResult.data;
    await pool.query(
      `
      DELETE FROM season
      WHERE id = $1`,
      [seasonId]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}
