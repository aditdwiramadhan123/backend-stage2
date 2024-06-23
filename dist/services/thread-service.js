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
exports.deleteThread = void 0;
var client_1 = require("@prisma/client");
var cloudinary_config_1 = __importDefault(require("../cloudinary-config"));
var prisma = new client_1.PrismaClient();
function findAllThreads() {
    return __awaiter(this, void 0, void 0, function () {
        var threads, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.thread.findMany({
                            include: {
                                author: {
                                    select: {
                                        name: true,
                                        username: true,
                                        profilePictureUrl: true,
                                    },
                                },
                                comments: {
                                    select: {
                                        author: {
                                            select: {
                                                name: true,
                                                username: true,
                                                profilePictureUrl: true,
                                            },
                                        },
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
                                _count: { select: { comments: true, likes: true } },
                            },
                            orderBy: {
                                createdAt: "desc", // Urutkan berdasarkan waktu pembuatan, descending
                            },
                        })];
                case 1:
                    threads = (_a.sent());
                    return [2 /*return*/, threads];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching all threads:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findThreadById(threadId) {
    return __awaiter(this, void 0, void 0, function () {
        var thread, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.thread.findUnique({
                            where: { id: threadId },
                            include: {
                                author: {
                                    select: {
                                        name: true,
                                        username: true,
                                        profilePictureUrl: true,
                                    },
                                },
                                comments: {
                                    select: {
                                        author: {
                                            select: {
                                                name: true,
                                                username: true,
                                                profilePictureUrl: true,
                                            },
                                        },
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
                                _count: { select: { comments: true, likes: true } },
                            },
                        })];
                case 1:
                    thread = (_a.sent());
                    return [2 /*return*/, thread];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching thread by ID:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createThread(authorId, threadData) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadImage, error_3, newThread, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    uploadImage = { secure_url: null };
                    if (!threadData.imageUrl) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, cloudinary_config_1.default)(threadData.imageUrl)];
                case 2:
                    uploadImage = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error uploading image to Cloudinary:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, prisma.thread.create({
                        data: __assign(__assign({}, threadData), { authorId: authorId, imageUrl: uploadImage.secure_url }),
                    })];
                case 5:
                    newThread = _a.sent();
                    return [2 /*return*/, newThread];
                case 6:
                    error_4 = _a.sent();
                    console.error("Error creating thread:", error_4);
                    throw error_4;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function updateThread(threadId, threadData) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadImage, error_5, existingThread, updatedThread, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    uploadImage = { secure_url: null };
                    if (!threadData.imageUrl) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, cloudinary_config_1.default)(threadData.imageUrl)];
                case 2:
                    uploadImage = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error("Error uploading image to Cloudinary:", error_5);
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, prisma.thread.findUnique({
                        where: { id: threadId },
                    })];
                case 5:
                    existingThread = _a.sent();
                    if (!existingThread) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, prisma.thread.update({
                            where: { id: threadId },
                            data: __assign(__assign({}, threadData), { imageUrl: uploadImage.secure_url }),
                        })];
                case 6:
                    updatedThread = _a.sent();
                    return [2 /*return*/, updatedThread];
                case 7:
                    error_6 = _a.sent();
                    console.error("Error updating thread:", error_6);
                    throw error_6;
                case 8: return [2 /*return*/];
            }
        });
    });
}
var deleteThread = function (threadId) { return __awaiter(void 0, void 0, void 0, function () {
    var thread, comments, commentIds, replyComments, replyCommentIds, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 12, , 13]);
                return [4 /*yield*/, prisma.thread.findUnique({
                        where: { id: threadId },
                        select: { id: true },
                    })];
            case 1:
                thread = _a.sent();
                if (!thread) {
                    throw new Error('Thread not found');
                }
                // Hapus likes pada thread
                return [4 /*yield*/, prisma.threadLike.deleteMany({
                        where: { threadId: threadId }
                    })];
            case 2:
                // Hapus likes pada thread
                _a.sent();
                return [4 /*yield*/, prisma.comment.findMany({
                        where: { threadId: threadId },
                        select: { id: true }
                    })];
            case 3:
                comments = _a.sent();
                if (!(comments.length > 0)) return [3 /*break*/, 10];
                commentIds = comments.map(function (comment) { return comment.id; });
                // Hapus likes pada komentar
                return [4 /*yield*/, prisma.commentLike.deleteMany({
                        where: { commentId: { in: commentIds } }
                    })];
            case 4:
                // Hapus likes pada komentar
                _a.sent();
                return [4 /*yield*/, prisma.replyComment.findMany({
                        where: { commentId: { in: commentIds } },
                    })];
            case 5:
                replyComments = _a.sent();
                if (!(replyComments.length > 0)) return [3 /*break*/, 8];
                replyCommentIds = replyComments.map(function (reply) { return reply.id; });
                // Hapus likes pada balasan komentar
                return [4 /*yield*/, prisma.replyCommentLike.deleteMany({
                        where: { replyCommentId: { in: replyCommentIds } }
                    })];
            case 6:
                // Hapus likes pada balasan komentar
                _a.sent();
                // Hapus balasan komentar
                return [4 /*yield*/, prisma.replyComment.deleteMany({
                        where: { id: { in: replyCommentIds } }
                    })];
            case 7:
                // Hapus balasan komentar
                _a.sent();
                _a.label = 8;
            case 8: 
            // Hapus komentar
            return [4 /*yield*/, prisma.comment.deleteMany({
                    where: { id: { in: commentIds } }
                })];
            case 9:
                // Hapus komentar
                _a.sent();
                _a.label = 10;
            case 10: 
            // Hapus thread
            return [4 /*yield*/, prisma.thread.delete({
                    where: { id: threadId }
                })];
            case 11:
                // Hapus thread
                _a.sent();
                return [2 /*return*/, { message: 'Thread deleted successfully' }];
            case 12:
                error_7 = _a.sent();
                throw new Error("Error deleting thread: ".concat(error_7.message));
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.deleteThread = deleteThread;
exports.default = {
    findAllThreads: findAllThreads,
    findThreadById: findThreadById,
    createThread: createThread,
    updateThread: updateThread,
    deleteThread: exports.deleteThread,
};
//# sourceMappingURL=thread-service.js.map