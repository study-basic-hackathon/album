import express from "express";
import { getSeasonById, getSeasonWorks, getSeasonWorkById } from '../usecases/season.js';

const router = express.Router();

// 季節の情報の取得
router.get("/:seasonId", getSeasonById);

// 季節の作品一覧の取得
router.get("/:seasonId/works", getSeasonWorks);

// 季節の特定の作品の取得
router.get("/:seasonId/works/:workId", getSeasonWorkById);

export default router;