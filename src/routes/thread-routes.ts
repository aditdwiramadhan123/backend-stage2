import express from "express";
import ThreadController from "../controllers/thread-controller";
import { authenticate } from "../middlewares/authenticate";
import threadAuth from "../middlewares/thread-authorization";
import { upload } from "../middlewares/upload-file";

const router = express.Router();

router.post("/thread", authenticate, upload.single("imageUrl"), ThreadController.create);
router.get("/threads", authenticate, ThreadController.findAll);
router.get("/threads/:authorName", authenticate, ThreadController.findAllByName);
router.get("/media/:authorName", authenticate, ThreadController.findAllMediaByName);
router.patch("/thread/:postId", authenticate, threadAuth, upload.single("imageUrl"), ThreadController.update);
router.get("/thread/:postId", ThreadController.findOne);
router.delete("/thread/:postId", authenticate, threadAuth, ThreadController.deleted);

export default router;
