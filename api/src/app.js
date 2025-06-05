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
app.get("/categories/{categoryId}", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM category WHERE id = $1", [
      id,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- カテゴリの作品の一覧
app.get("/categories/{categoryId}/works", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM work WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// -- カテゴリの作品の取得
app.get("/categories/{categoryId}/works/{workID}", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM work WHERE id = $1", [id]);
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
