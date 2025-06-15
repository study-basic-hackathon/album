import express from "express";
import { getMaterialById, getMaterialWorks, getMaterialWorkById } from '../usecases/material.js';

const router = express.Router();

// 花材の情報の取得
router.get("/:materialId", getMaterialById);

// 花材の作品一覧の取得
router.get("/:materialId/works", getMaterialWorks);

// 花材の特定の作品の取得
router.get("/:materialId/works/:workId", getMaterialWorkById);

export default router;