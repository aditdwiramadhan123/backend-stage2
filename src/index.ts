import express, { Request, Response } from "express";
import cors from "cors";
import { upload } from "./middlewares/upload-file";
import { authenticate } from "./middlewares/authenticate";
import threadAuth from "./middlewares/thread-authorization";
import commentAuth from "./middlewares/comment-auth";
import replyCommentAuth from "./middlewares/reply-comment-auth";

// MODULE CONTROLLER
import CommentController from "./controllers/comment-controller";
import ThreadController from "./controllers/thread-controller";
import UserController from "./controllers/user-controller";
import ReplyCommentController from "./controllers/reply-comment-controller";
import LikeCommentController from "./controllers/like-comment-controller";
import LikeThreadController from "./controllers/like-thread-controller";
import likeReplyCommentController from "./controllers/like-reply-comment-controller";
import FollowController from "./controllers/follow-controller";
import dotenv from "dotenv";

const app = express();
const port = 3000;
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", router);

// comment routes
import commentRoutes from "./routes/comment-routes"; // Sesuaikan path dengan struktur folder Anda
app.use("/api/v1",commentRoutes)

// reply comment routes
import replyCommentRoutes from "./routes/reply-comments-route"; // Sesuaikan path dengan struktur folder Anda
app.use("/api/v1",replyCommentRoutes)

// thread routes
import threadRoutes from "./routes/thread-routes"; // Sesuaikan path dengan struktur folder Anda
app.use("/api/v1",threadRoutes)

dotenv.config();

// ROUTER FOLLOW
router.get("/getFollower/:userId",authenticate, FollowController.findAllFollowers);
router.get("/getFollowing/:userId",authenticate, FollowController.findAllFollowing);
router.post("/follow/:followingId",authenticate, FollowController.following);
router.delete("/follow/:userId/:followingId", FollowController.unFollow);

// // ROUTER LIKE REPLY COMMENT
// router.get(
//   "/likes-reply-comment/:replyCommentId",
//   likeReplyCommentController.findLikesAll
// );
// router.get(
//   "/like-reply-comment/:likeReplyCommentId",
//   likeReplyCommentController.findOne
// );
// router.post(
//   "/like-reply-comment/:userId/:replyCommentId",
//   likeReplyCommentController.likeReplyComment
// );
// router.delete(
//   "/like-reply-comment/:likeReplyCommentId",
//   likeReplyCommentController.unlikeReplyComment
// );

// // ROUTER LIKE COMMENT
// router.get("/likes-comment/:commentId", LikeCommentController.findLikesAll);
// router.get("/like-comment/:likeCommentId", LikeCommentController.findOne);
// router.post(
//   "/like-comment/:userId/:commentId",
//   LikeCommentController.likeComment
// );
// router.delete(
//   "/like-comment/:likeCommentId",
//   LikeCommentController.unlikeComment
// );

// ROUTER LIKE THREAD
router.get("/likes/:threadId", LikeThreadController.findAll);
router.get("/like/:threadLikeId", LikeThreadController.findOne);
router.post("/like/:threadId",authenticate, LikeThreadController.createLike);
router.delete("/like/:threadLikeId", LikeThreadController.unlikeThread);

// ROUTER USER & LOGIN
router.get("/check",authenticate,UserController.check)
router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.get("/users", authenticate, UserController.findAllByName);
router.patch("/edit-profil", authenticate,upload.single("imageUrl"), UserController.update);

router.get("/user",authenticate, UserController.findOne);
router.delete("/user-delete",authenticate, UserController.deleted);

// // ROUTER THREAD (udah fiks)
// router.post(
//   "/thread",
//   authenticate,
//   upload.single("imageUrl"),
//   ThreadController.create
// );
// router.get("/threads", authenticate, ThreadController.findAll);
// router.patch(
//   "/thread/:postId",
//   authenticate,
//   threadAuth,
//   upload.single("imageUrl"),
//   ThreadController.update
// );
// router.get("/thread/:postId", ThreadController.findOne);
// router.delete(
//   "/thread/:postId",
//   authenticate,
//   threadAuth,
//   ThreadController.deleted
// );

// // ROUTHER COMMENT
// router.post(
//   "/comment/:threadId",
//   authenticate,
//   upload.single("imageUrl"),
//   CommentController.create
// );
// router.get("/comments/:threadId", authenticate, CommentController.findAll);
// router.patch(
//   "/comment/:threadId/:commentId",
//   authenticate,
//   commentAuth,
//   upload.single("imageUrl"),
//   CommentController.update
// );
// router.get(
//   "/comment/:threadId/:commentId",
//   authenticate,
//   CommentController.findOne
// );
// router.delete(
//   "/comment/:threadId/:commentId",
//   authenticate,
//   commentAuth,
//   CommentController.deleted
// );

// // ROUTER REPLY COMMENT
// router.post(
//   "/reply-comment/:commentId",
//   authenticate,
//   upload.single("imageUrl"),
//   ReplyCommentController.create
// );
// router.get(
//   "/replies-comment/:commentId",
//   authenticate,
//   ReplyCommentController.findAll
// );
// router.patch(
//   "/reply-comment/:commentId/:replyCommentId",
//   authenticate,
//   replyCommentAuth,
//   upload.single("imageUrl"),
//   ReplyCommentController.update
// );
// router.get(
//   "/reply-comment/:commentId/:replyCommentId",
//   authenticate,
//   ReplyCommentController.findOne
// );
// router.delete(
//   "/reply-comment/:commentId/:replyCommentId",
//   authenticate,
//   replyCommentAuth,
//   ReplyCommentController.deleted
// );

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
