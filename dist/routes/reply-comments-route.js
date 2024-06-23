"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var reply_comment_controller_1 = __importDefault(require("../controllers/reply-comment-controller"));
var authenticate_1 = require("../middlewares/authenticate");
var reply_comment_auth_1 = __importDefault(require("../middlewares/reply-comment-auth"));
"../middlewares/reply-comment-auth";
var upload_file_1 = require("../middlewares/upload-file");
var router = express_1.default.Router();
router.use(authenticate_1.authenticate);
router.post("/reply-comment/:commentId", upload_file_1.upload.single("imageUrl"), reply_comment_controller_1.default.create);
router.get("/replies-comment/:commentId", reply_comment_controller_1.default.findAll);
router.patch("/reply-comment/:commentId/:replyCommentId", reply_comment_auth_1.default, upload_file_1.upload.single("imageUrl"), reply_comment_controller_1.default.update);
router.get("/reply-comment/:commentId/:replyCommentId", reply_comment_controller_1.default.findOne);
router.delete("/reply-comment/:commentId/:replyCommentId", reply_comment_auth_1.default, reply_comment_controller_1.default.deleted);
exports.default = router;
//# sourceMappingURL=reply-comments-route.js.map