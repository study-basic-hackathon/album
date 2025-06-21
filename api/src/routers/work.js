import express from "express";
import { updateWork } from "../repositories/work";

const router = express.Router();

// 作品の更新
router.put("/:workId", async (req, res) => {
    try {
        const { workId } = req.params;
        const { title, arrangerId, materialId, season, categoryId, imageIds } = req.body;
        if (!/^\d+$/.test(workId)) {
            return res.status(400).json({ message: "Invalid workId" });
        }
        const result = await updateWork(workId, title, arrangerId, materialId, season, categoryId, imageIds);
        if (result === undefined) {
            return res.status(404).json({ message: "Resource not found" });
        }   
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } 
});