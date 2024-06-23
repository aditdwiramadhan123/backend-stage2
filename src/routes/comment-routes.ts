import express from "express";
import CommentController from "../controllers/comment-controller";
import { authenticate } from "../middlewares/authenticate";
import commentAuth from "../middlewares/comment-auth";
import { upload } from "../middlewares/upload-file";

const router = express.Router();
router.use(authenticate);

router.post(
  "/comment/:threadId",
  upload.single("imageUrl"),
  CommentController.create
);
router.get("/comments/:threadId", CommentController.findAll);
router.patch(
  "/comment/:commentId",
  authenticate,
  commentAuth,
  upload.single("imageUrl"),
  CommentController.update
);
router.get("/comment/:commentId", CommentController.findOne);

router.delete(
  "/comment/:commentId",
  authenticate,
  commentAuth,
  CommentController.deleted
);

export default router;
