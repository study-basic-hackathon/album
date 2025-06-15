import express from "express";
import { getExhibitions, getExhibitionById, getExhibitionWorks, getExhibitionWorkById } from '../usecases/exhibition.js';

const router = express.Router();

// 華展の一覧
router.get("/", getExhibitions);

// 華展の情報の取得
router.get("/:exhibitionId", getExhibitionById);

// 華展の作品一覧の取得
router.get("/:exhibitionId/works", getExhibitionWorks);

// 華展の特定の作品の取得
router.get("/:exhibitionId/works/:workId", getExhibitionWorkById);

export default router;