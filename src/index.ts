import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import CommentController from "./controllers/comment-controller";
import ThreadController from "./controllers/thread-controller";
import UserController from "./controllers/user-controller";
import ReplyCommentController from "./controllers/reply-commentar-controller";
import LikeCommentController from "./controllers/like-comment-controller";
import LikeThreadController from "./controllers/like-thread-controller";
import likeReplyCommentController from "./controllers/like-reply-comment-controller";
import FollowController from "./controllers/follow-controller";
import dotenv from "dotenv";

const app = express();
const port = 3000;
const prisma = new PrismaClient();
const router = express.Router();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

dotenv.config();

// ROUTER FOLLOW
router.get("/followers/:userId", FollowController.findAllFollowers);
router.get("/following/:userId", FollowController.findAllFollowing);
router.post("/follow/:userId/:followingId", FollowController.createFollow);
router.delete("/follow/:userId/:followingId", FollowController.unFollow);

// ROUTER LIKE REPLY COMMENT
router.get("/likes-reply-comment/:replyCommentId",likeReplyCommentController.findLikesAll
);
router.get("/like-reply-comment/:likeReplyCommentId",
  likeReplyCommentController.findOne
);
router.post(
  "/like-reply-comment/:userId/:replyCommentId",
  likeReplyCommentController.likeReplyComment
);
router.delete(
  "/like-reply-comment/:likeReplyCommentId",
  likeReplyCommentController.unlikeReplyComment
);

// ROUTER LIKE COMMENT
router.get("/likes-comment/:commentId", LikeCommentController.findLikesAll);
router.get("/like-comment/:likeCommentId", LikeCommentController.findOne);
router.post(
  "/like-comment/:userId/:commentId",
  LikeCommentController.likeComment
);
router.delete(
  "/like-comment/:likeCommentId",
  LikeCommentController.unlikeComment
);

// ROUTER LIKE THREAD
router.get("/likes/:threadId", LikeThreadController.findAll);
router.get("/like/:threadLikeId", LikeThreadController.findOne);
router.post("/like/:userId/:threadId", LikeThreadController.createLike);
router.delete("/like/:threadLikeId", LikeThreadController.unlikeThread);

// ROUTER USER & LOGIN
router.post("/user", UserController.create);
router.post("/user/login", UserController.login);
router.get("/users", UserController.findAll);
router.patch("/user/:username", UserController.update);
router.get("/user/:username", UserController.findOne);
router.delete("/user/:username", UserController.deleted);


// ROUTER THREAD
router.post("/thread", ThreadController.create);
router.get("/threads", ThreadController.findAll);
router.patch("/thread/:postId", ThreadController.update);
router.get("/thread/:postId", ThreadController.findOne);
router.delete("/thread/:postId", ThreadController.deleted);

// ROUTHER COMMENT
router.post("/comment", CommentController.create);
router.get("/comments/:threadId", CommentController.findAll);
router.patch("/comment/:commentId", CommentController.update);
router.get("/comment/:commentId", CommentController.findOne);
router.delete("/comment/:commentId", CommentController.deleted);

// ROUTHER REPLY COMMENT
router.post("/reply-comment", ReplyCommentController.create);
router.get("/replies-comment/:commentId", ReplyCommentController.findAll);
router.patch("/reply-comment/:replyCommentId", ReplyCommentController.update);
router.get("/reply-comment/:replyCommentId", ReplyCommentController.findOne);
router.delete("/reply-comment/:replyCommentId", ReplyCommentController.deleted);

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
