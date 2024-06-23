import express, { NextFunction, Request, Response } from "express";
import ThreadController from "../controllers/thread-controller";
import { authenticate } from "../middlewares/authenticate";
import threadAuth from "../middlewares/thread-authorization";
import { upload } from "../middlewares/upload-file";
import { redisClient } from "../libs/redis";

const router = express.Router();

router.post(
  "/thread",
  authenticate,
  upload.single("imageUrl"),
  ThreadController.create
);
router.get(
  "/threads",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await redisClient.get("THREADS_DATA");
    if (result) {
        return res.status(200).json(JSON.parse(result));
    }
    else {
        next();
    }
  },
  ThreadController.findAll
);
router.get(
  "/threads/:authorName",
  authenticate,
  ThreadController.findAllByName
);
router.get(
  "/media/:authorName",
  authenticate,
  ThreadController.findAllMediaByName
);
router.patch(
  "/thread/:postId",
  authenticate,
  threadAuth,
  upload.single("imageUrl"),
  ThreadController.update
);
router.get("/thread/:postId", authenticate,ThreadController.findOne);
router.delete("/thread/:postId", ThreadController.deleted);

export default router;
