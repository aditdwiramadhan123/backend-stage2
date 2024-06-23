"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var reply_comment_service_1 = __importDefault(require("../services/reply-comment-service"));
var prisma = new client_1.PrismaClient();
function findAll(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var commentId, commentIdNumber, replyComments, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    commentId = req.params.commentId;
                    commentIdNumber = Number(commentId);
                    return [4 /*yield*/, reply_comment_service_1.default.findAllReplyComments(commentIdNumber)];
                case 1:
                    replyComments = _a.sent();
                    res.status(200).json(replyComments);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).json({ error: "Failed to find reply comments" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findOne(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var replyCommentId, replyCommentIdNumber, replyComment, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    replyCommentId = req.params.replyCommentId;
                    replyCommentIdNumber = Number(replyCommentId);
                    return [4 /*yield*/, reply_comment_service_1.default.findReplyCommentById(replyCommentIdNumber)];
                case 1:
                    replyComment = _a.sent();
                    if (!replyComment) {
                        return [2 /*return*/, res.status(404).json({ error: "Reply comment not found" })];
                    }
                    res.status(200).json(replyComment);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json({ error: "Failed to find reply comment" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, commentId, replyCommentData, newReplyComment, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = res.locals.user.id;
                    commentId = Number(req.params.commentId);
                    replyCommentData = __assign(__assign({}, req.body), { imageUrl: req.file ? req.file.path : null, authorId: userId, commentId: commentId });
                    if (!replyCommentData.content || !userId || !commentId) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Content, authorId, and commentId are required" })];
                    }
                    return [4 /*yield*/, reply_comment_service_1.default.createReplyComment(replyCommentData)];
                case 1:
                    newReplyComment = _a.sent();
                    res.status(201).json(newReplyComment);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({ error: "Failed to create reply comment" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var replyCommentData, replyCommentId, replyCommentIdNumber, updatedReplyComment, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    replyCommentData = __assign(__assign({}, req.body), { imageUrl: req.file ? req.file.path : null });
                    console.log(replyCommentData);
                    replyCommentId = req.params.replyCommentId;
                    replyCommentIdNumber = Number(replyCommentId);
                    if (!replyCommentData.content) {
                        return [2 /*return*/, res.status(400).json({ error: "Content is required" })];
                    }
                    return [4 /*yield*/, reply_comment_service_1.default.updateReplyComment(replyCommentIdNumber, replyCommentData)];
                case 1:
                    updatedReplyComment = _a.sent();
                    if (!updatedReplyComment) {
                        return [2 /*return*/, res.status(404).json({ error: "Reply comment not found" })];
                    }
                    res.status(200).json(updatedReplyComment);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(500).json({ error: "Failed to update reply comment" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleted(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var replyCommentId, replyCommentIdNumber, deletedReplyComment, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    replyCommentId = req.params.replyCommentId;
                    replyCommentIdNumber = Number(replyCommentId);
                    return [4 /*yield*/, reply_comment_service_1.default.deleteReplyComment(replyCommentIdNumber)];
                case 1:
                    deletedReplyComment = _a.sent();
                    res.status(200).json("Success to delete reply comment ".concat(replyCommentIdNumber));
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(500).json({ error: "Failed to delete reply comment" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = { findAll: findAll, findOne: findOne, create: create, update: update, deleted: deleted };
//# sourceMappingURL=reply-comment-controller.js.map