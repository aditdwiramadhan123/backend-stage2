"use strict";
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
var reply_comment_service_1 = __importDefault(require("./reply-comment-service"));
var prisma = new client_1.PrismaClient();
function findAllCommentReplyLikes(replyCommentId) {
    return __awaiter(this, void 0, void 0, function () {
        var commentReplyLikes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.replyCommentLike.findMany({
                            where: { replyCommentId: replyCommentId },
                        })];
                case 1:
                    commentReplyLikes = _a.sent();
                    return [2 /*return*/, commentReplyLikes];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching all comment reply likes: ".concat(reply_comment_service_1.default), error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findCommentReplyLikeById(ReplyCommentLikeId) {
    return __awaiter(this, void 0, void 0, function () {
        var commentReplyLike, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.replyCommentLike.findUnique({
                            where: { id: ReplyCommentLikeId },
                        })];
                case 1:
                    commentReplyLike = _a.sent();
                    return [2 /*return*/, commentReplyLike];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching comment reply likes: ".concat(reply_comment_service_1.default), error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function likeCommentReply(userId, replyCommentId) {
    return __awaiter(this, void 0, void 0, function () {
        var newCommentReplyLike, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.replyCommentLike.create({
                            data: { userId: userId, replyCommentId: replyCommentId },
                        })];
                case 1:
                    newCommentReplyLike = _a.sent();
                    return [2 /*return*/, newCommentReplyLike];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error liking comment reply:", error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function unlikeCommentReply(commentReplyLikeId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedCommentReplyLike, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.replyCommentLike.delete({
                            where: { id: commentReplyLikeId },
                        })];
                case 1:
                    deletedCommentReplyLike = _a.sent();
                    return [2 /*return*/, deletedCommentReplyLike];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error unliking comment reply:", error_4);
                    throw error_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleteReplyLikeByCommentId(commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var replyComments, replyCommentIds, deletedLikes, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma.replyComment.findMany({
                            where: { commentId: commentId },
                            select: { id: true },
                        })];
                case 1:
                    replyComments = _a.sent();
                    replyCommentIds = replyComments.map(function (reply) { return reply.id; });
                    return [4 /*yield*/, prisma.replyCommentLike.deleteMany({
                            where: {
                                replyCommentId: {
                                    in: replyCommentIds,
                                },
                            },
                        })];
                case 2:
                    deletedLikes = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error("Error delete all comment reply likes by comment id: ".concat(commentId), error_5);
                    throw error_5;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    findAllCommentReplyLikes: findAllCommentReplyLikes,
    findCommentReplyLikeById: findCommentReplyLikeById,
    likeCommentReply: likeCommentReply,
    unlikeCommentReply: unlikeCommentReply,
    deleteReplyLikeByCommentId: deleteReplyLikeByCommentId,
};
//# sourceMappingURL=like-reply-comment-service.js.map