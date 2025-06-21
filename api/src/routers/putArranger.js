import express from "express";
import { putArranger } from "../usecases/putArranger.js";

const router = express.Router();

// 作者の更新
router.get("/:arrangerId", async (req, res) => {
  try {
    const { arrangerId, name } = req.params;
    if (!/^\d+$/.test(arrangerId)) {
      return res.status(400).json({ message: "Invalid arrangerId" });
    }
    const result = await putArranger(arrangerId, name );
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
