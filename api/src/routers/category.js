import express from "express";
import { getCategoryById, getCategoryWorks, getCategoryWorkById } from '../usecases/category.js';

const router = express.Router();

// カテゴリーの情報の取得
router.get("/:categoryId", getCategoryById);

// カテゴリーの作品一覧の取得
router.get("/:categoryId/works", getCategoryWorks);

// カテゴリーの特定の作品の取得
router.get("/:categoryId/works/:workId", getCategoryWorkById);

export default router;