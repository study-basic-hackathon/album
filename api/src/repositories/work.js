import { pool } from "../db.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";

// 作品の登録
export async function createWork(payload) {
  let client; // スコープはトランザクション内のみ
  const { title, exhibitionId, arrangerId, materialIds, seasonId, categoryId, imageIds } = payload;

  try {
    client = await pool.connect();
    await client.query("BEGIN");

    // workテーブル
    const insertedWork = await client.query(
      `
      INSERT INTO work(title, exhibition_id, arranger_id, season_id, category_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`,
      [title, exhibitionId, arrangerId, seasonId, categoryId]
    );

    const workId = insertedWork.rows[0].id;

    // work_materialテーブル
    await client.query(
      `
      INSERT INTO work_material (work_id, material_id)
      SELECT $1, unnest($2::int[])`,
      [workId, materialIds]
    );

    // work_imageテーブル
    await client.query(
      `
      INSERT INTO work_image (work_id, image_id)
      SELECT $1, unnest($2::int[])`,
      [workId, imageIds]
    );

    await client.query("COMMIT");
    return Result.ok(workId);
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  } finally {
    if (client) {
      client.release();
    }
  }
}

// 作品の存在確認
export async function ensureRecord(id) {
  try {
    const { workId } = id;
    const result = await pool.query(
      `
      SELECT COUNT(*)
      FROM work WHERE id = $1`,
      [workId]
    );
    const count = parseInt(result.rows[0].count, 10);
    if (count === 0) {
      return Result.fail(AppError.notFound("Work not found"));
    }
    return Result.ok();
  } catch (error) {
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  }
}

// 作品の更新
export async function updateWork(id, payload) {
  let client; // スコープはトランザクション内のみ
  const { workId } = id;
  const { title, exhibitionId, arrangerId, seasonId, categoryId, materialIds, imageIds } = payload;

  try {
    client = await pool.connect();
    await client.query("BEGIN");

    // workテーブルの更新
    await client.query(
      `
    UPDATE work
    SET
      title = $2,
      exhibition_id = $3,
      arranger_id = $4,
      season_id = $5,
      category_id = $6
    WHERE id = $1`,
      [workId, title, exhibitionId, arrangerId, seasonId, categoryId]
    );

    // work_materialテーブルの更新
    await client.query(
      `
    DELETE FROM work_material
    WHERE work_id = $1`,
      [workId]
    );
    await client.query(
      `
    INSERT INTO work_material (work_id, material_id)
    SELECT $1, unnest($2::int[])`,
      [workId, materialIds]
    );

    // work_imageテーブルの更新
    await client.query(
      `
    DELETE FROM work_image
    WHERE work_id = $1`,
      [workId]
    );
    await client.query(
      `
    INSERT INTO work_image (work_id, image_id)
    SELECT $1, unnest($2::int[])`,
      [workId, imageIds]
    );

    await client.query("COMMIT");
    return Result.ok(workId);
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  } finally {
    if (client) {
      client.release();
    }
  }
}

// 作品の削除
export async function deleteWork(id) {
  try {
    const { workId } = id;
    await pool.query(
      `DELETE FROM work
       WHERE id = $1`,
      [workId]
    );
    return Result.ok();
  } catch (error) {
    console.error("Error:", error);
    return Result.fail(AppError.sqlError());
  }
}
