import { pool } from "../db.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getWorkListByCondition } from "./utils/getWorkListByCondition.js";

//花材の登録
export async function insertMaterial(payloadResult) {
  try {
    const { name } = payloadResult.data;
    const result = await pool.query(
      `
      INSERT INTO material (name)
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

// 花材の取得
export async function findMaterialById(idResult) {
  try {
    const { materialId } = idResult.data;
    const result = await pool.query(
      `
      SELECT *
      FROM material
      WHERE id = $1`,
      [materialId]
    );
    if (!result.rows[0]) {
      return Result.fail(AppError.notFound("Material not found"));
    }
    return Result.ok(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 花材の作品一覧の取得
export async function findWorksByMaterialId(idsResult) {
  try {
    const { materialId } = idsResult.data;
    const workList = await getWorkListByCondition({
      where: "wm.material_id = $1",
      params: [materialId],
      orderBy: "wk.created_at ASC",
    });
    if (!workList || workList.length === 0) {
      return Result.fail(AppError.notFound("materialWork not found"));
    }
    return Result.ok(workList);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 花材の特定の作品の取得
export async function getWork(workListResult, idsResult) {
  try {
    const { workId } = idsResult.data;
    const workList = workListResult.data;
    const work = workList.find((item) => String(item.work.id) === workId);
    if (!work) {
      return Result.fail(AppError.notFound("materialWork not found"));
    }
    return Result.ok(work);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 花材の存在確認
export async function ensureRecordExists(idResult) {
  try {
    const { materialId } = idResult.data;
    const result = await pool.query(
      `
      SELECT COUNT(*)
      FROM material WHERE id = $1`,
      [materialId]
    );
    const count = parseInt(result.rows[0].count, 10);
    if (count === 0) {
      return Result.fail(AppError.notFound("Material not found"));
    }
    return Result.ok();
  } catch (error) {
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  }
}

// 花材の更新
export async function updateMaterial(idResult, payloadResult) {
  try {
    const { materialId } = idResult.data;
    const { name } = payloadResult.data;
    await pool.query(
      `
      UPDATE material
      SET name = $2
      WHERE id = $1 `,
      [materialId, name]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// 花材の削除
export async function deleteMaterial(idResult) {
  try {
    const { materialId } = idResult.data;
    await pool.query(
      `
      DELETE FROM material
      WHERE id = $1`,
      [materialId]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}
