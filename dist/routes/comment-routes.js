"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var comment_controller_1 = __importDefault(require("../controllers/comment-controller"));
var authenticate_1 = require("../middlewares/authenticate");
var comment_auth_1 = __importDefault(require("../middlewares/comment-auth"));
var upload_file_1 = require("../middlewares/upload-file");
var router = express_1.default.Router();
router.use(authenticate_1.authenticate);
router.post("/comment/:threadId", upload_file_1.upload.single("imageUrl"), comment_controller_1.default.create);
router.get("/comments/:threadId", comment_controller_1.default.findAll);
router.patch("/comment/:commentId", authenticate_1.authenticate, comment_auth_1.default, upload_file_1.upload.single("imageUrl"), comment_controller_1.default.update);
router.get("/comment/:commentId", comment_controller_1.default.findOne);
router.delete("/comment/:commentId", authenticate_1.authenticate, comment_auth_1.default, comment_controller_1.default.deleted);
exports.default = router;
//# sourceMappingURL=comment-routes.js.map