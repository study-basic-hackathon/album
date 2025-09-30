import { pool } from "../db.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getWorkListByCondition } from "./utils/getWorkListByCondition.js";

//カテゴリの登録
export async function insertCategory(payloadResult) {
  try {
    const { name } = payloadResult.data;
    const result = await pool.query(
      `
      INSERT INTO category (name)
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

// カテゴリの取得
export async function findCategoryById(idResult) {
  try {
    const { categoryId } = idResult.data;
    const result = await pool.query(
      `
      SELECT *
      FROM category
      WHERE id = $1`,
      [categoryId]
    );
    if (!result.rows[0]) {
      return Result.fail(AppError.notFound("Category not found"));
    }
    return Result.ok(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// カテゴリーの作品一覧の取得
export async function findWorksByCategoryId(idsResult) {
  try {
    const { categoryId } = idsResult.data;
    const workList = await getWorkListByCondition({
      where: "wk.category_id = $1",
      params: [categoryId],
      orderBy: "wk.created_at ASC",
    });
    if (!workList || workList.length === 0) {
      return Result.fail(AppError.notFound("categoryWork not found"));
    }
    return Result.ok(workList);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// カテゴリの特定の作品の取得
export async function getWork(workListResult, idsResult) {
  try {
    const { workId } = idsResult.data;
    const workList = workListResult.data;
    const work = workList.find((item) => String(item.work.id) === workId);
    if (!work) {
      return Result.fail(AppError.notFound("categoryWork not found"));
    }
    return Result.ok(work);
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// カテゴリの存在確認
export async function ensureRecordExists(idResult) {
  try {
    const { categoryId } = idResult.data;
    const result = await pool.query(
      `
      SELECT COUNT(*)
      FROM category WHERE id = $1`,
      [categoryId]
    );
    const count = parseInt(result.rows[0].count, 10);
    if (count === 0) {
      return Result.fail(AppError.notFound("Category not found"));
    }
    return Result.ok();
  } catch (error) {
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  }
}

// カテゴリの更新
export async function updateCategory(idResult, payloadResult) {
  try {
    const { categoryId } = idResult.data;
    const { name } = payloadResult.data;
    await pool.query(
      `
      UPDATE category
      SET name = $2
      WHERE id = $1 `,
      [categoryId, name]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}

// カテゴリの削除
export async function deleteCategory(idResult) {
  try {
    const { categoryId } = idResult.data;
    await pool.query(
      `
      DELETE FROM category
      WHERE id = $1`,
      [categoryId]
    );
    return Result.ok();
  } catch (err) {
    console.error("Error:", err);
    return Result.fail(AppError.sqlError());
  }
}
