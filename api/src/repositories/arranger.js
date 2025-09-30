import { pool } from "../db.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getWorkListByCondition } from "./utils/getWorkListByCondition.js";

//作者の登録
export async function insertArranger(payloadResult) {
  try {
    const { name } = payloadResult.data;
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
export async function findArrangerById(idResult) {
  try {
    const { arrangerId } = idResult.data;
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
export async function findWorksByArrangerId(idsResult) {
  try {
    const { arrangerId } = idsResult.data;
    const workList = await getWorkListByCondition({
      where: "wk.arranger_id = $1",
      params: [arrangerId],
      orderBy: "wk.created_at ASC",
    });
    if (!workList || workList.length === 0) {
      return Result.fail(AppError.notFound("arrangerWork not found"));
    }
    return Result.ok(workList);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 作者の特定の作品の取得
export async function getWork(workListResult, idsResult) {
  try {
    const { workId } = idsResult.data;
    const workList = workListResult.data;
    const work = workList.find((item) => String(item.work.id) === workId);
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
export async function ensureRecordExists(idResult) {
  try {
    const { arrangerId } = idResult.data;
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
export async function updateArranger(idResult, payloadResult) {
  try {
    const { arrangerId } = idResult.data;
    const { name } = payloadResult.data;
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
export async function deleteArranger(idResult) {
  try {
    const { arrangerId } = idResult.data;
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
