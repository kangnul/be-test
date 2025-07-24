import { Router } from "express";
import { rawFileUpload } from "../middlewares/fileUpload.middleware";
import { uploadFile, listFiles } from "../controllers/fileController";

const router = Router();

router.post("/upload", rawFileUpload, uploadFile);
router.get("/files", listFiles);

export default router;