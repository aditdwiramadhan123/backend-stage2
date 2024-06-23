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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function findAllCommentLikes(commentId) {
    return __awaiter(this, void 0, void 0, function () {
        var commentLikes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.commentLike.findMany({
                            where: { commentId: commentId },
                        })];
                case 1:
                    commentLikes = _a.sent();
                    return [2 /*return*/, commentLikes];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching all comment likes:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findCommentLikeById(commentLikeId) {
    return __awaiter(this, void 0, void 0, function () {
        var commentLike, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.commentLike.findUnique({
                            where: { id: commentLikeId },
                        })];
                case 1:
                    commentLike = _a.sent();
                    return [2 /*return*/, commentLike];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching comment like by ID:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function likeComment(commentId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var newCommentLike, error_3, deletedCommentLike, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 7]);
                    return [4 /*yield*/, prisma.commentLike.create({
                            data: { commentId: commentId, userId: userId },
                        })];
                case 1:
                    newCommentLike = _a.sent();
                    return [2 /*return*/, newCommentLike];
                case 2:
                    error_3 = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, prisma.commentLike.delete({
                            where: {
                                userId_commentId: {
                                    commentId: commentId,
                                    userId: userId,
                                },
                            },
                        })];
                case 4:
                    deletedCommentLike = _a.sent();
                    return [2 /*return*/, deletedCommentLike];
                case 5:
                    error_4 = _a.sent();
                    console.error("Error unliking comment:", error_4);
                    throw error_4;
                case 6: throw error_3;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function unlikeComment(commentLikeId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedCommentLike, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.commentLike.delete({
                            where: { id: commentLikeId },
                        })];
                case 1:
                    deletedCommentLike = _a.sent();
                    return [2 /*return*/, deletedCommentLike];
                case 2:
                    error_5 = _a.sent();
                    console.error("Error unliking comment:", error_5);
                    throw error_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = { likeComment: likeComment, unlikeComment: unlikeComment, findAllCommentLikes: findAllCommentLikes, findCommentLikeById: findCommentLikeById };
//# sourceMappingURL=like-comment-service.js.map