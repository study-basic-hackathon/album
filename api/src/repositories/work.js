import { pool } from "../db.js";

// 作品の登録
export async function insertWork(title, arranger_id, material_ids, season_id, category_id, image_ids) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // work テーブルに作品情報を登録
    const workResult = await client.query(
      `
      INSERT INTO
          work(title, arranger_id, season_id, category_id)
      VALUES
          ($1, $2, $3, $4)
      RETURNING
          id
      `,
      [title, arranger_id, season_id, category_id]
    );

    const workId = workResult.rows[0].id;

    // work_material テーブルにデータを登録
    if (material_ids && material_ids.length > 0) {
      const materialInserts = material_ids.map(materialId => `(${workId}, ${materialId})`).join(',');
      await client.query(`
        INSERT INTO
            work_material(work_id, material_id)
        VALUES
            ${materialInserts}
      `);
    }

    // image テーブルにデータを登録
    if (image_ids && image_ids.length > 0) {
      const imageInserts = image_ids.map(imageId => `(${imageId}, ${workId})`).join(',');
      await client.query(`
        INSERT INTO
            image(id, work_id)
        VALUES
            ${imageInserts}
      `);
    }

    await client.query('COMMIT');
    return workId;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error registering data:', error);
    throw error;
  } finally {
    client.release();
  }
}

// 作品の更新
export async function updateWorkBase(workId, title, arranger_id, season_id, category_id) {
    const result = await pool.query(`
        UPDATE 
            work
        SET
            title = $2,
            arranger_id = $3,
            season_id = $4,
            category_id = $5
        WHERE
            id = $1
        `,  
        [workId, title, arranger_id, season_id, category_id]
    );
    return result.rows;
};

export async function updateWorkMaterials(workId, material_ids) {
    await pool.query(`DELETE FROM work_material WHERE work_id = $1`, [workId]);
    for (const materialId of material_ids) {
        await pool.query(
            `INSERT INTO work_material (work_id, material_id) VALUES ($1, $2)`,
            [workId, materialId]
        );
    }
}

export async function updateWorkImages(workId, image_ids) {
    await pool.query(`UPDATE image SET work_id = NULL WHERE work_id = $1`, [workId]);
    if (image_ids.length > 0) {
        await pool.query(`UPDATE image SET work_id = $1 WHERE id = ANY($2)`, [workId, image_ids]);
    }
}

export async function updateWork(
    workId,
    title,
    arranger_id,
    material_ids,
    season_id,
    category_id,
    image_ids
) {
    const result = await updateWorkBase(workId, title, arranger_id, season_id, category_id);
    await updateWorkMaterials(workId, material_ids);
    await updateWorkImages(workId, image_ids); 
    return result;
}

// 作品の削除
export async function deleteWork(workId) {
    const result = await pool.query(`
        DELETE FROM
            work
        WHERE
            id = $1
        `, 
        [workId]
    );
    return result.rowCount > 0;
}