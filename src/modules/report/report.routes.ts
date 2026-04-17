import { Router } from "express";
import { downloadPDF, downloadExcel } from "./report.controller";
import { protect } from "../../middleware/auth.middleware";

const router = Router();

router.get("/pdf", protect, downloadPDF);
router.get("/excel", protect, downloadExcel);

export default router;