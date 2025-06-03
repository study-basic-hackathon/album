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
      "SELECT ",
      +"w.id",
      +"w.title",
      +"w.author_id",
      +"COALESCE(json_agg(DISTINCT wm.material_id) FILTER (WHERE wm.material_id IS NOT NULL), '[]') AS material_ids",
      +"w.category_id",
      +"w.season",
      +"COALESCE(json_agg(DISTINCT i.url) FILTER (WHERE i.id IS NOT NULL), '[]') AS image_urls",
      +"FROM work w",
      +"LEFT JOIN image i ON i.work_id = w.id",
      +"LEFT JOIN work_material wm ON wm.work_id = w.id",
      +"WHERE w.category_id = $1",
      +"GROUP BY w.id",
      +"ORDER BY w.id ASC",
      [categoryId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No works found for this category" });
    }

    // 作品情報を整形
    const works = result.rows.map((work) => ({
      work: {
        id: work.id,
        title: work.title || "No title", // null の場合 "No title" を表示
        author_id: work.author_id,
        material_ids: work.material_ids, // 配列で返されるためそのまま
        season: work.season, // `season_id` をそのまま返す
        category_id: work.category_id, // カテゴリID
        image_urls: work.image_urls, // 配列で返されるためそのまま
      },
      navigation: {
        next: null, // 次の作品を設定するロジックが必要
        previous: null, // 前の作品を設定するロジックが必要
      },
    }));

    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// // -- カテゴリの作品の取得
// app.get("/categories/:categoryId/works/:workId", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("SELECT * FROM category WHERE id = $1", [
//       id,
//     ]);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("DB Error:", err);
//     res.status(500).json({ error: "Database query failed" });
//   }
// });

// -- season
// -- 季節の情報の所得
app.get("/seasons/:seasonId", async (req, res) => {
  const { seasonId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM season WHERE id = $1", [
      seasonId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// // -- 季節の作品の一覧
// app.get("/seasons/:seasonId/works", async (req, res) => {
//   const { season_id } = req.params;
//   try {
//     const result = await pool.query(
//       "SELECT * ",
//       +"w.id",
//       +"w.titel",
//       +"w.aothor_id",
//       +"COALESCE(json_agg(DISTINCT wm.material_id) FILTER (WHERE wm.material_id IS NOT NULL), '[]') AS material_ids",
//       +"w.category_id",
//       +"w.season",
//       +"COALESCE(json_agg(DISTINCT i.url) FILTER (WHERE i.id IS NOT NULL), '[]') AS image_urls",
//       +"FROM work w",
//       +"LEFT JOIN image i ON i.work_id = w.id",
//       +"LEFT JOIN work_material wm ON wm.work_id = w.id",
//       +"WHERE season_id = $1",
//       +"GROUP BY w.id",
//       +"ORDER BY w.id ASC",
//       [season_id]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error("DB Error:", err);
//     res.status(500).json({ error: "Database query failed" });
//   }
// });

// // -- 季節の作品の取得
// app.get("/seasons/:seasonId/works/:workId", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("SELECT * FROM work WHERE id = $1", [id]);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("DB Error:", err);
//     res.status(500).json({ error: "Database query failed" });
//   }
// });

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
