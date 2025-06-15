import express from "express";
import { getArrangerById, getArrangerWorks, getArrangerWorkById } from '../usecases/arranger.js';

const router = express.Router();

// 作者の情報の取得
router.get("/:arrangerId", getArrangerById);

// 作者の作品一覧の取得
router.get("/:arrangerId/works", getArrangerWorks);

// 作者の特定の作品の取得
router.get("/:arrangerId/works/:workId", getArrangerWorkById);

export default router;