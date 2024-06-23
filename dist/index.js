"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var upload_file_1 = require("./middlewares/upload-file");
var authenticate_1 = require("./middlewares/authenticate");
var user_controller_1 = __importDefault(require("./controllers/user-controller"));
var like_comment_controller_1 = __importDefault(require("./controllers/like-comment-controller"));
var like_thread_controller_1 = __importDefault(require("./controllers/like-thread-controller"));
var like_reply_comment_controller_1 = __importDefault(require("./controllers/like-reply-comment-controller"));
var follow_controller_1 = __importDefault(require("./controllers/follow-controller"));
var dotenv_1 = __importDefault(require("dotenv"));
// comment routes
var comment_routes_1 = __importDefault(require("./routes/comment-routes")); // Sesuaikan path dengan struktur folder Anda
var reply_comments_route_1 = __importDefault(require("./routes/reply-comments-route")); // Sesuaikan path dengan struktur folder Anda
var thread_routes_1 = __importDefault(require("./routes/thread-routes")); // Sesuaikan path dengan struktur folder Anda
var redis_1 = require("./libs/redis");
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var router = express_1.default.Router();
(0, redis_1.initializeRedisClient)().then(function () {
    var limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        limit: 100000,
        standardHeaders: "draft-7",
        legacyHeaders: false,
        store: new rate_limit_redis_1.default({
            sendCommand: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return redis_1.redisClient.sendCommand(args);
            },
        }),
    });
    app.use(limiter);
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/uploads", express_1.default.static("uploads"));
    app.use("/api/v1", router);
    dotenv_1.default.config();
    // ROUTER FOLLOW
    router.get("/getFollower/:userId", authenticate_1.authenticate, follow_controller_1.default.findAllFollowers);
    router.get("/getFollowing/:userId", authenticate_1.authenticate, follow_controller_1.default.findAllFollowing);
    router.get("/suggestFriend", authenticate_1.authenticate, follow_controller_1.default.suggestFriends);
    router.post("/follow/:followingId", authenticate_1.authenticate, follow_controller_1.default.following);
    router.delete("/follow/:userId/:followingId", follow_controller_1.default.unFollow);
    // ROUTER LIKE REPLY COMMENT
    router.get("/likes-reply-comment/:replyCommentId", like_reply_comment_controller_1.default.findLikesAll);
    router.get("/like-reply-comment/:likeReplyCommentId", like_reply_comment_controller_1.default.findOne);
    router.post("/like-reply-comment/:userId/:replyCommentId", like_reply_comment_controller_1.default.likeReplyComment);
    router.delete("/like-reply-comment/:likeReplyCommentId", like_reply_comment_controller_1.default.unlikeReplyComment);
    router.delete("/like-reply-comment/:commentId", like_reply_comment_controller_1.default.deleteLikeReplyByCommentId);
    // ROUTER LIKE COMMENT
    app.get("/", function (req, res) {
        res.send("hello world");
        redis_1.redisClient.set("HELLO_WORLD", "hellow world");
    });
    router.get("/likes-comment/:commentId", like_comment_controller_1.default.findLikesAll);
    router.get("/like-comment/:likeCommentId", like_comment_controller_1.default.findOne);
    router.post("/like-comment/:commentId", authenticate_1.authenticate, like_comment_controller_1.default.likeComment);
    router.delete("/like-comment/:likeCommentId", like_comment_controller_1.default.unlikeComment);
    // ROUTER LIKE THREAD
    router.get("/likes/:threadId", like_thread_controller_1.default.findAll);
    router.get("/like/:threadLikeId", like_thread_controller_1.default.findOne);
    router.post("/like/:threadId", authenticate_1.authenticate, like_thread_controller_1.default.createLike);
    router.delete("/like/:threadLikeId", like_thread_controller_1.default.unlikeThread);
    // ROUTER USER & LOGIN
    router.get("/check", authenticate_1.authenticate, user_controller_1.default.check);
    router.post("/register", user_controller_1.default.create);
    router.post("/login", user_controller_1.default.login);
    router.get("/users", authenticate_1.authenticate, user_controller_1.default.findAllByName);
    router.patch("/edit-profil", authenticate_1.authenticate, upload_file_1.upload.single("profilePictureUrl"), user_controller_1.default.update);
    router.get("/user", authenticate_1.authenticate, user_controller_1.default.findOne);
    router.delete("/user-delete", authenticate_1.authenticate, user_controller_1.default.deleted);
    // ROUTER TO VERIFY EMAIL
    router.get("/verify-email", user_controller_1.default.verifyEmail);
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
    app.use("/api/v1", thread_routes_1.default);
    app.use("/api/v1", comment_routes_1.default);
    app.use("/api/v1", reply_comments_route_1.default);
    app.listen(port, function () {
        console.log("Server running at http://localhost:".concat(port));
    });
});
//# sourceMappingURL=index.js.map