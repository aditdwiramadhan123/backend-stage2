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
function findAllThreadLikes(threadId) {
    return __awaiter(this, void 0, void 0, function () {
        var threadLikes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.threadLike.findMany({
                            where: { threadId: threadId },
                        })];
                case 1:
                    threadLikes = _a.sent();
                    return [2 /*return*/, threadLikes];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching all thread likes:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findThreadLikeById(threadLikeId) {
    return __awaiter(this, void 0, void 0, function () {
        var threadLike, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.threadLike.findUnique({
                            where: { id: threadLikeId },
                        })];
                case 1:
                    threadLike = _a.sent();
                    return [2 /*return*/, threadLike];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching thread like by ID:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function likeThread(threadId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var newThreadLike, error_3, deletedThreadLike, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 7]);
                    return [4 /*yield*/, prisma.threadLike.create({
                            data: { threadId: threadId, userId: userId },
                        })];
                case 1:
                    newThreadLike = _a.sent();
                    return [2 /*return*/, newThreadLike];
                case 2:
                    error_3 = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, prisma.threadLike.delete({
                            where: {
                                userId_threadId: {
                                    threadId: threadId,
                                    userId: userId,
                                },
                            },
                        })];
                case 4:
                    deletedThreadLike = _a.sent();
                    return [2 /*return*/, deletedThreadLike];
                case 5:
                    error_4 = _a.sent();
                    console.error("Error unliking thread:", error_4);
                    throw error_4;
                case 6: throw error_3;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function unlikeThread(threadLikeId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedThreadLike, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.threadLike.delete({
                            where: { id: threadLikeId },
                        })];
                case 1:
                    deletedThreadLike = _a.sent();
                    return [2 /*return*/, deletedThreadLike];
                case 2:
                    error_5 = _a.sent();
                    console.error("Error unliking thread:", error_5);
                    throw error_5;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    likeThread: likeThread,
    findAllThreadLikes: findAllThreadLikes,
    findThreadLikeById: findThreadLikeById,
    unlikeThread: unlikeThread,
};
//# sourceMappingURL=like-thread-service.js.map