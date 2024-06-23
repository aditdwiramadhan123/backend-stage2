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
exports.deleteComment = void 0;
var client_1 = require("@prisma/client");
var cloudinary_config_1 = __importDefault(require("../cloudinary-config"));
var prisma = new client_1.PrismaClient();
function findAllComments() {
    return __awaiter(this, void 0, void 0, function () {
        var comments, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.comment.findMany({
                            include: {
                                author: {
                                    select: {
                                        name: true,
                                        username: true,
                                        profilePictureUrl: true,
                                    },
                                },
                                likes: {
                                    select: {
                                        user: {
                                            select: {
                                                name: true,
                                                username: true,
                                                profilePictureUrl: true,
                                            },
                                        },
                                    },
                                },
                                _count: { select: { likes: true } },
                            },
                            orderBy: {
                                createdAt: "desc",
                            },
                        })];
                case 1:
                    comments = (_a.sent());
                    return [2 /*return*/, comments];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching all comments:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findAllCommentsByUserId(threadId) {
    return __awaiter(this, void 0, void 0, function () {
        var comments, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.comment.findMany({
                            where: { threadId: threadId },
                            include: {
                                author: {
                                    select: {
                                        name: true,
                                        username: true,
                                        profilePictureUrl: true,
                                    },
                                },
                                likes: {
                                    select: {
                                        user: {
                                            select: {
                                                name: true,
                                                username: true,
                                                profilePictureUrl: true,
                                            },
                                        },
                                    },
                                },
                                _count: { select: { likes: true } },
                            },
                            orderBy: {
                                createdAt: "desc",
                            },
                        })];
                case 1:
                    comments = (_a.sent());
                    return [2 /*return*/, comments];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching all comments:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findCommentById(commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var comment, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.comment.findUnique({
                            where: { id: commentId },
                        })];
                case 1:
                    comment = _a.sent();
                    return [2 /*return*/, comment];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error fetching comment by ID:", error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createComment(commentData) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadImage, error_4, newComment, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    uploadImage = { secure_url: null };
                    if (!commentData.imageUrl) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, cloudinary_config_1.default)(commentData.imageUrl)];
                case 2:
                    uploadImage = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error uploading image to Cloudinary:", error_4);
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, prisma.comment.create({
                        data: __assign(__assign({}, commentData), { imageUrl: uploadImage.secure_url }),
                    })];
                case 5:
                    newComment = _a.sent();
                    return [2 /*return*/, newComment];
                case 6:
                    error_5 = _a.sent();
                    console.error("Error creating comment:", error_5);
                    throw error_5;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function updateComment(commentId, updateData) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadImage, error_6, existingComment, updatedComment, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    uploadImage = { secure_url: null };
                    if (!updateData.imageUrl) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, cloudinary_config_1.default)(updateData.imageUrl)];
                case 2:
                    uploadImage = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.error("Error uploading image to Cloudinary:", error_6);
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, prisma.comment.findUnique({
                        where: { id: commentId },
                    })];
                case 5:
                    existingComment = _a.sent();
                    if (!existingComment) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, prisma.comment.update({
                            where: { id: commentId },
                            data: __assign(__assign({}, updateData), { imageUrl: uploadImage.secure_url }),
                        })];
                case 6:
                    updatedComment = _a.sent();
                    return [2 /*return*/, updatedComment];
                case 7:
                    error_7 = _a.sent();
                    console.error("Error updating comment:", error_7);
                    throw error_7;
                case 8: return [2 /*return*/];
            }
        });
    });
}
var deleteComment = function (commentId) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, replyComments, replyCommentIds, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, prisma.comment.findUnique({
                        where: { id: commentId },
                        select: { id: true },
                    })];
            case 1:
                comment = _a.sent();
                // Hapus likes pada komentar
                return [4 /*yield*/, prisma.commentLike.deleteMany({
                        where: { commentId: commentId },
                    })];
            case 2:
                // Hapus likes pada komentar
                _a.sent();
                return [4 /*yield*/, prisma.replyComment.findMany({
                        where: { commentId: commentId },
                        select: { id: true },
                    })];
            case 3:
                replyComments = _a.sent();
                if (!(replyComments.length > 0)) return [3 /*break*/, 6];
                replyCommentIds = replyComments.map(function (reply) { return reply.id; });
                // Hapus likes pada balasan komentar
                return [4 /*yield*/, prisma.replyCommentLike.deleteMany({
                        where: { replyCommentId: { in: replyCommentIds } },
                    })];
            case 4:
                // Hapus likes pada balasan komentar
                _a.sent();
                // Hapus balasan komentar
                return [4 /*yield*/, prisma.replyComment.deleteMany({
                        where: { id: { in: replyCommentIds } },
                    })];
            case 5:
                // Hapus balasan komentar
                _a.sent();
                _a.label = 6;
            case 6: 
            // Hapus komentar
            return [4 /*yield*/, prisma.comment.delete({
                    where: { id: commentId },
                })];
            case 7:
                // Hapus komentar
                _a.sent();
                return [2 /*return*/, { message: "Comment deleted successfully" }];
            case 8:
                error_8 = _a.sent();
                throw new Error("Error deleting comment: ".concat(error_8.message));
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.deleteComment = deleteComment;
exports.default = {
    findAllComments: findAllComments,
    findAllCommentsByUserId: findAllCommentsByUserId,
    findCommentById: findCommentById,
    createComment: createComment,
    updateComment: updateComment,
    deleteComment: exports.deleteComment,
};
//# sourceMappingURL=comment-service.js.map