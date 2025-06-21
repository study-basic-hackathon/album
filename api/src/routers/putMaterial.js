import express from "express";
import { putMaterial } from '../usecases/putMaterial.js';

const router = express.Router();

// 花材の更新
router.get("/:materialId", async (req, res) => {
  try{
      const { materialId, name } = req.params;
      if (!/^\d+$/.test(materialId)) {
        return res.status(400).json({ message: "Invalid materialId" });
      };
      const result = await putMaterial(materialId, name);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

export default router;