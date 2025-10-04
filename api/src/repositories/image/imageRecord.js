import { pool } from "../../db.js";
import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";

export async function createRecord() {
  try {
    const result = await pool.query(
      `
      INSERT INTO image (created_at)
      VALUES (NOW())
      RETURNING id`,
      []
    );
    return Result.ok(result.rows[0].id);
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.sqlError());
  }
}

export async function deleteRecord(id) {
  try {
    const { imageId } = id;
    const result = await pool.query(
      `
      DELETE FROM image WHERE id = $1`,
      [imageId]
    );
    if (result.rowCount === 0) {
      return Result.fail(AppError.internalError());
    }
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.sqlError());
  }
}
