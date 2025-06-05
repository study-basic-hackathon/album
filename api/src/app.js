import express from "express";
import cors from "cors";

import { pool } from "./db.js";

const app = express();

// REFERENCE: https://developer.mozilla.org/ja/docs/Glossary/CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM post");
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// exhibition
// -- 華展の一覧
app.get("/exhibitions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name,TO_CHAR(started_date, 'YYYY-MM-DD') AS started_date, TO_CHAR(ended_date, 'YYYY-MM-DD')AS ended_date FROM exhibition"
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
    const result = await pool.query(
      "SELECT * FROM exhibition WHERE id = $1",
      [exhibitionId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 華展の作品の一覧
app.get("/exhibitions/:exhibitionId/works", async (req, res) => {
  const { exhibitionId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM work WHERE exhibition_id = $1",
      [exhibitionId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// --華展の作品の取得
app.get("/exhibitions/:exhibitionId/works/:workId", async (req, res) => {
  const { exhibitionId, workId } = req.params;
  try {
    const result = await pool.query(
       "SELECT * FROM work WHERE exhibition_id = $1 AND id = $2",
      [exhibitionId, workId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

//author
// -- 作者の情報の取得
app.get("/authors/:authorId", async (req, res) => {
  const { authorId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM author WHERE id = $1",
      [authorId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 作者の作品の一覧
app.get("/authors/:authorId/works", async (req, res) => {
  const { authorId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM work WHERE author_id = $1",
      [authorId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// --作者の作品の取得
app.get("/authors/:authorId/works/:workId", async (req, res) => {
  const { authorId, workId } = req.params;
  try {
    const result = await pool.query(
       "SELECT * FROM work WHERE author_id = $1 AND id = $2",
      [authorId, workId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
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
    const result = await pool.query(
      "SELECT * FROM material WHERE id = $1",
      [materialId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 材料の作品の一覧
app.get("/materials/:materialId/works", async (req, res) => {
  const { materialId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM work_material WHERE material_id = $1",
      [materialId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// --材料の作品の取得
app.get("/exhibitions/:exhibitionId/works/:workId", async (req, res) => {
  const { materialId, workId } = req.params;
  try {
    const result = await pool.query(
       "SELECT * FROM work_material WHERE material_id = $1 AND work_id = $2",
      [materialId, workId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resourse not found" });
    };
    res.json(result.rows);
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
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- カテゴリの作品の一覧
app.get("/categories/:categoryId/works", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query(
      `
      WITH base AS (
        SELECT 
          w.id,
          w.title,
          w.author_id,
          w.category_id,
          w.season AS season_id,
          w.create_date,
          COALESCE(json_agg(DISTINCT wm.material_id) FILTER (WHERE wm.material_id IS NOT NULL), '[]') AS material_ids,
          COALESCE(json_agg(DISTINCT i.url) FILTER (WHERE i.url IS NOT NULL), '[]') AS image_urls
        FROM work w
        LEFT JOIN work_material wm ON wm.work_id = w.id
        LEFT JOIN image i ON i.work_id = w.id
        WHERE w.category_id = $1
        GROUP BY w.id
      ),
      numbered AS (
        SELECT 
          *,
          LAG(id) OVER (ORDER BY create_date ASC) AS previous,
          LEAD(id) OVER (ORDER BY create_date ASC) AS next
        FROM base
      )
      SELECT 
        json_build_object(
          'id', id,
          'title', title,
          'author_id', author_id,
          'material_ids', material_ids,
          'category_id', category_id,
          'season_id', season_id,
          'image_urls', image_urls
        ) AS work,
        json_build_object(
          'previous', previous,
          'next', next
        ) AS navigation
      FROM numbered
      ORDER BY create_date ASC;
      `,
      [categoryId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- カテゴリの作品の取得
app.get("/categories/:categoryId/works/:workId", async (req, res) => {
  const { categoryId, workId } = req.params;
  try {
    const result = await pool.query(
      `
      WITH base AS (
        SELECT 
          w.id,
          w.title,
          w.author_id,
          w.category_id,
          w.season AS season_id,
          w.create_date,
          COALESCE(json_agg(DISTINCT wm.material_id) FILTER (WHERE wm.material_id IS NOT NULL), '[]') AS material_ids,
          COALESCE(json_agg(DISTINCT i.url) FILTER (WHERE i.url IS NOT NULL), '[]') AS image_urls
        FROM work w
        LEFT JOIN work_material wm ON wm.work_id = w.id
        LEFT JOIN image i ON i.work_id = w.id
        WHERE w.category_id = $1
        GROUP BY w.id
      ),
      numbered AS (
        SELECT 
          *,
          LAG(id) OVER (ORDER BY create_date ASC) AS previous,
          LEAD(id) OVER (ORDER BY create_date ASC) AS next
        FROM base
      )
      SELECT 
        json_build_object(
          'id', id,
          'title', title,
          'author_id', author_id,
          'material_ids', material_ids,
          'category_id', category_id,
          'season_id', season_id,
          'image_urls', image_urls
        ) AS work,
        json_build_object(
          'previous', previous,
          'next', next
        ) AS navigation
      FROM numbered
      WHERE id = $2
      ORDER BY create_date ASC;
      `,
      [categoryId, workId]
    );
    res.json(result.rows);
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
    const result = await pool.query(
      "SELECT id, season FROM work WHERE id = $1",
      [seasonId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 季節の作品の一覧
app.get("/seasons/:seasonId/works", async (req, res) => {
  const { seasonId } = req.params;
  try {
    const result = await pool.query(
      `
      WITH base AS (
        SELECT 
          w.id,
          w.title,
          w.author_id,
          w.category_id,
          w.season AS season_id,
          w.create_date,
          COALESCE(json_agg(DISTINCT wm.material_id) FILTER (WHERE wm.material_id IS NOT NULL), '[]') AS material_ids,
          COALESCE(json_agg(DISTINCT i.url) FILTER (WHERE i.url IS NOT NULL), '[]') AS image_urls
        FROM work w
        LEFT JOIN work_material wm ON wm.work_id = w.id
        LEFT JOIN image i ON i.work_id = w.id
        WHERE w.season = $1
        GROUP BY w.id
      ),
      numbered AS (
        SELECT 
          *,
          LAG(id) OVER (ORDER BY create_date ASC) AS previous,
          LEAD(id) OVER (ORDER BY create_date ASC) AS next
        FROM base
      )
      SELECT 
        json_build_object(
          'id', id,
          'title', title,
          'author_id', author_id,
          'material_ids', material_ids,
          'category_id', category_id,
          'season_id', season_id,
          'image_urls', image_urls
        ) AS work,
        json_build_object(
          'previous', previous,
          'next', next
        ) AS navigation
      FROM numbered
      ORDER BY create_date ASC;
      `,
      [seasonId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- 季節の作品の取得
app.get("/seasons/:seasonId/works/:workId", async (req, res) => {
  const { seasonId, workId } = req.params;
  try {
    const result = await pool.query(
      `
      WITH base AS (
        SELECT 
          w.id,
          w.title,
          w.author_id,
          w.category_id,
          w.season AS season_id,
          w.create_date,
          COALESCE(json_agg(DISTINCT wm.material_id) FILTER (WHERE wm.material_id IS NOT NULL), '[]') AS material_ids,
          COALESCE(json_agg(DISTINCT i.url) FILTER (WHERE i.url IS NOT NULL), '[]') AS image_urls
        FROM work w
        LEFT JOIN work_material wm ON wm.work_id = w.id
        LEFT JOIN image i ON i.work_id = w.id
        WHERE w.season = $1
        GROUP BY w.id
      ),
      numbered AS (
        SELECT 
          *,
          LAG(id) OVER (ORDER BY create_date ASC) AS previous,
          LEAD(id) OVER (ORDER BY create_date ASC) AS next
        FROM base
      )
      SELECT 
        json_build_object(
          'id', id,
          'title', title,
          'author_id', author_id,
          'material_ids', material_ids,
          'category_id', category_id,
          'season_id', season_id,
          'image_urls', image_urls
        ) AS work,
        json_build_object(
          'previous', previous,
          'next', next
        ) AS navigation
      FROM numbered
      WHERE id = $2
      ORDER BY create_date ASC;
      `,
      [seasonId, workId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM post WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// WARNING: SQL Injection Attack
// REFERENCE: https://developer.mozilla.org/ja/docs/Glossary/SQL_Injection
app.post("/posts", express.json(), async (req, res) => {
  const { body } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO post (body) VALUES ($1) RETURNING *",
      [body]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default app;
