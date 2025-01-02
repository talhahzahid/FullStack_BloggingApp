import express from "express";
import { signUp } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router()

router.post('/signup', upload.single('image'), signUp);

export default router