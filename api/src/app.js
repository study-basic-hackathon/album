import express from "express";
import path from "path";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

// REFERENCE: https://developer.mozilla.org/ja/docs/Glossary/CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

function formatWorksWithNavigation(works) {
  const formattedResults = works.map((work, index) => {
    let previousWorkId = null;
    let nextWorkId = null;

    if (index > 0) {
      previousWorkId = works[index - 1].id;
    }
    if (index < works.length - 1) {
      nextWorkId = works[index + 1].id;
    }

    return {
      work: {
        id: work.id,
        title: work.title,
        arranger_id: work.arranger_id,
        material_ids: work.material_ids,
        season_id: work.season_id,
        category_id: work.category_id,
        image_urls: work.image_urls,
        created_at: work.created_at,
      },
      navigation: {
        previous: previousWorkId,
        next: nextWorkId,
      },
    };
  });
  return formattedResults;
}

// exhibition
// -- 華展の一覧
app.get("/exhibitions", async (req, res) => {
  try {
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
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 華展の取得
app.get("/exhibitions/:exhibitionId", async (req, res) => {
  const { exhibitionId } = req.params;
  try {
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
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 華展の作品の一覧
app.get("/exhibitions/:exhibitionId/works", async (req, res) => {
  const { exhibitionId } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wk.exhibition_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC`,
      [exhibitionId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedResults = formatWorksWithNavigation(result.rows);
    res.json(formattedResults);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// --華展の作品の取得
app.get("/exhibitions/:exhibitionId/works/:workId", async (req, res) => {
  const { exhibitionId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wk.exhibition_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC`,
      [exhibitionId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    const formattedWorks = formatWorksWithNavigation(result.rows);
    const foundWork = formattedWorks.find(item => item.work.id === targetWorkId);
    if (!foundWork) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(foundWork);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

//arranger
// -- 作者の情報の取得
app.get("/arrangers/:arrangerId", async (req, res) => {
  const { arrangerId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM arranger WHERE id = $1", [
      arrangerId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 作者の作品の一覧
app.get("/arrangers/:arrangerId/works", async (req, res) => {
  const { arrangerId } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wk.arranger_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC
        `,
      [arrangerId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedResults = formatWorksWithNavigation(result.rows);
    res.json(formattedResults);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// --作者の作品の取得
app.get("/arrangers/:arrangerId/works/:workId", async (req, res) => {
  const { arrangerId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wk.arranger_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC`,
      [arrangerId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    const formattedWorks = formatWorksWithNavigation(result.rows);
    const foundWork = formattedWorks.find(item => item.work.id === targetWorkId);
    if (!foundWork) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(foundWork);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

//material
// -- 材料の情報の取得
app.get("/materials/:materialId", async (req, res) => {
  const { materialId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM material WHERE id = $1", [
      materialId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 材料の作品の一覧
app.get("/materials/:materialId/works", async (req, res) => {
  const { materialId } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wm.material_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC`,
      [materialId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedResults = formatWorksWithNavigation(result.rows);
    res.json(formattedResults);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// --材料の作品の取得
app.get("/materials/:materialId/works/:workId", async (req, res) => {
  const { materialId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wm.material_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC
        `,
      [materialId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedWorks = formatWorksWithNavigation(result.rows);
    const foundWork = formattedWorks.find(item => item.work.id === targetWorkId);
    if (!foundWork) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(foundWork);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// category
// -- カテゴリの情報の取得
app.get("/categories/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM category WHERE id = $1", [
      categoryId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- カテゴリの作品の一覧
app.get("/categories/:categoryId/works", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wk.category_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_id
      ORDER BY
        wk.created_id ASC`,
      [categoryId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedResults = formatWorksWithNavigation(result.rows);
    res.json(formattedResults);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- カテゴリの作品の取得
app.get("/categories/:categoryId/works/:workId", async (req, res) => {
  const { categoryId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wk.category_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC
        `,
      [categoryId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedWorks = formatWorksWithNavigation(result.rows);
    const foundWork = formattedWorks.find(item => item.work.id === targetWorkId);
    if (!foundWork) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(foundWork);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// season
// -- 季節の情報の所得
app.get("/seasons/:seasonId", async (req, res) => {
  const { seasonId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM season WHERE id = $1", [
      seasonId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Season not found" });
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 季節の作品の一覧
app.get("/seasons/:seasonId/works", async (req, res) => {
  const { seasonId } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wk.season_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC`,
      [seasonId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedResults = formatWorksWithNavigation(result.rows);
    res.json(formattedResults);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 季節の作品の取得
app.get("/seasons/:seasonId/works/:workId", async (req, res) => {
  const { seasonId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    const result = await pool.query(`
      SELECT
        wk.id,
        wk.title,
        wk.arranger_id,
        ARRAY_AGG(DISTINCT wm.material_id) AS material_ids,
        wk.category_id,
        wk.season_id,
        ARRAY_AGG(DISTINCT ie.url) AS image_urls,
        TO_CHAR(wk.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
      FROM
        work AS wk
      JOIN
        work_material AS wm ON wk.id = wm.work_id
      JOIN
        image AS ie ON wk.id = ie.work_id
      WHERE
        wk.season_id = $1
      GROUP BY
        wk.id, wk.title, wk.arranger_id, wk.season_id, wk.category_id, wk.created_at
      ORDER BY
        wk.created_at ASC
        `,
      [seasonId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedWorks = formatWorksWithNavigation(result.rows);
    const foundWork = formattedWorks.find(item => item.work.id === targetWorkId);
    if (!foundWork) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(foundWork);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// image
// --作品の画像の取得
// image
// --作品の画像の取得
app.get("/images/:imageId", (req, res) => {
  const imageId = req.params.imageId; 
  const filePath = path.resolve("src", "upload", imageId);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "画像が見つかりませんでした" });
    }
  });
});

export default app;
