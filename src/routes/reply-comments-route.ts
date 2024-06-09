import express from "express"
import ReplyCommentController from "../controllers/reply-comment-controller";
import { authenticate } from "../middlewares/authenticate";
import replyCommentAuth from "../middlewares/reply-comment-auth"; "../middlewares/reply-comment-auth";
import { upload } from "../middlewares/upload-file";


const router = express.Router();
router.use(authenticate);

router.post("/reply-comment/:commentId", upload.single("imageUrl"), ReplyCommentController.create);
router.get("/replies-comment/:commentId", ReplyCommentController.findAll);
router.patch("/reply-comment/:commentId/:replyCommentId", replyCommentAuth, upload.single("imageUrl"), ReplyCommentController.update);
router.get("/reply-comment/:commentId/:replyCommentId", ReplyCommentController.findOne);
router.delete("/reply-comment/:commentId/:replyCommentId", replyCommentAuth, ReplyCommentController.deleted);

export default router;
