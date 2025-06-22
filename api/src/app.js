import express from "express";
import cors from "cors";
import exhibitionRoutes from './routers/exhibition.js';
import arrangerRoutes from './routers/arranger.js';
import materialRoutes from './routers/material.js';
import categoryRoutes from './routers/category.js';
import seasonRoutes from './routers/season.js';
import imageRoutes from './routers/image.js'

const app = express();

app.use(express.json());

// REFERENCE: https://developer.mozilla.org/ja/docs/Glossary/CORS
app.use(cors());

app.use("/exhibitions", exhibitionRoutes);
app.use("/arrangers", arrangerRoutes);
app.use("/materials", materialRoutes);
app.use("/categories", categoryRoutes);
app.use("/seasons", seasonRoutes);
app.use("/images", imageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;