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
var thread_service_1 = __importDefault(require("../services/thread-service"));
var client_1 = require("@prisma/client");
var time_service_1 = __importDefault(require("../services/time-service"));
var prisma = new client_1.PrismaClient();
function findAll(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, threadsService, ThreadController, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = res.locals.user.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, thread_service_1.default.findAllThreads()];
                case 2:
                    threadsService = _a.sent();
                    ThreadController = threadsService === null || threadsService === void 0 ? void 0 : threadsService.map(function (thread) {
                        return {
                            threadData: {
                                name: thread.author.name,
                                profilePictureUrl: thread.author.profilePictureUrl,
                                username: thread.author.username,
                                id: thread.id,
                                caption: thread.caption,
                                duration: (0, time_service_1.default)(thread.createdAt),
                                imageUrl: thread.imageUrl,
                                comments: thread._count.comments,
                                likes: thread._count.likes,
                                isLike: thread.likes.some(function (userLike) {
                                    return username === userLike.user.username;
                                }),
                            },
                            userLikes: thread.likes,
                            userComments: thread.comments,
                        };
                    });
                    // redisClient.set("THREADS_DATA", JSON.stringify(ThreadController));
                    res.status(201).json(ThreadController);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(500).json({ error: "Failed to find threads" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findAllByName(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, authorName, threads, threadsByFormat, authorThreads, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = res.locals.user.username;
                    authorName = req.params.authorName;
                    if (!authorName) {
                        return [2 /*return*/, res.status(400).json({ error: "Author name parameter is missing" })];
                    }
                    console.log(authorName);
                    if (!authorName) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Failed to find users: 'name' parameter is required" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, thread_service_1.default.findAllThreads()];
                case 2:
                    threads = _a.sent();
                    threadsByFormat = threads === null || threads === void 0 ? void 0 : threads.map(function (threadDB) {
                        return {
                            threadData: {
                                name: threadDB.author.name,
                                profilePictureUrl: threadDB.author.profilePictureUrl,
                                username: threadDB.author.username,
                                id: threadDB.id,
                                caption: threadDB.caption,
                                duration: (0, time_service_1.default)(threadDB.createdAt),
                                imageUrl: threadDB.imageUrl,
                                comments: threadDB._count.comments,
                                likes: threadDB._count.likes,
                                isLike: threadDB.likes.some(function (userLike) {
                                    return username === userLike.user.username;
                                }),
                            },
                            userLikes: threadDB.likes,
                            userComments: threadDB.comments,
                        };
                    });
                    authorThreads = threadsByFormat.filter(function (thread) {
                        return thread.threadData.username === authorName;
                    });
                    res.status(201).json(authorThreads);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.status(500).json({ error: "Failed to find threads" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findAllMediaByName(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, authorName, threads, Allmedia, authorThreads, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = res.locals.user.username;
                    authorName = req.params.authorName;
                    console.log(authorName);
                    if (!authorName) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Failed to find users: 'name' parameter is required" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, thread_service_1.default.findAllThreads()];
                case 2:
                    threads = _a.sent();
                    Allmedia = threads === null || threads === void 0 ? void 0 : threads.map(function (threadDB) {
                        return {
                            threadData: {
                                name: threadDB.author.name,
                                profilePictureUrl: threadDB.author.profilePictureUrl,
                                username: threadDB.author.username,
                                id: threadDB.id,
                                caption: threadDB.caption,
                                duration: (0, time_service_1.default)(threadDB.createdAt),
                                imageUrl: threadDB.imageUrl,
                                comments: threadDB._count.comments,
                                likes: threadDB._count.likes,
                                isLike: threadDB.likes.some(function (userLike) {
                                    return username === userLike.user.username;
                                }),
                            },
                            userLikes: threadDB.likes,
                            userComments: threadDB.comments,
                        };
                    });
                    authorThreads = Allmedia.filter(function (media) {
                        return (media.threadData.username === authorName && media.threadData.imageUrl);
                    });
                    res.status(201).json(authorThreads);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(500).json({ error: "Failed to find threads" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function findOne(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, postId, threadId, threadDB, thread, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("ini adalah respon findone");
                    username = res.locals.user.username;
                    console.log("ini username", username);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    postId = req.params.postId;
                    threadId = Number(postId);
                    return [4 /*yield*/, thread_service_1.default.findThreadById(threadId)];
                case 2:
                    threadDB = _a.sent();
                    thread = {
                        threadData: {
                            name: threadDB.author.name,
                            profilePictureUrl: threadDB.author.profilePictureUrl,
                            username: threadDB.author.username,
                            id: threadDB.id,
                            caption: threadDB.caption,
                            duration: (0, time_service_1.default)(threadDB.createdAt),
                            imageUrl: threadDB.imageUrl,
                            comments: threadDB._count.comments,
                            likes: threadDB._count.likes,
                            isLike: threadDB.likes.some(function (userLike) {
                                return username === userLike.user.username;
                            }),
                        },
                        userLikes: threadDB.likes,
                        userComments: threadDB.comments,
                    };
                    res.status(201).json(thread);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    res.status(500).json({ error: "Failed to find thread" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, threadData, newThread, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = res.locals.user.id;
                    threadData = __assign(__assign({}, req.body), { imageUrl: req.file ? req.file.path : null });
                    if (!threadData.caption || !userId) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Caption and authorId are required" })];
                    }
                    return [4 /*yield*/, thread_service_1.default.createThread(userId, threadData)];
                case 1:
                    newThread = _a.sent();
                    // redisClient.del("THREADS_DATA");
                    res.status(201).json(newThread);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(500).json({ error: "Failed to create thread" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var postId, threadId, userId, threadData, updateThread, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postId = req.params.postId;
                    threadId = Number(postId);
                    userId = res.locals.user.id;
                    threadData = __assign(__assign({}, req.body), { imageUrl: req.file ? req.file.path : null });
                    if (!threadData.caption || !userId) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Caption and authorId are required" })];
                    }
                    console.log(threadId, threadData);
                    return [4 /*yield*/, thread_service_1.default.updateThread(threadId, threadData)];
                case 1:
                    updateThread = _a.sent();
                    // redisClient.del("THREADS_DATA");
                    res.status(201).json(updateThread);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.status(500).json({ error: "Failed to update thread" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleted(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var postId, threadId, deleteThread, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postId = req.params.postId;
                    threadId = Number(postId);
                    return [4 /*yield*/, thread_service_1.default.deleteThread(threadId)];
                case 1:
                    deleteThread = _a.sent();
                    // redisClient.del("THREADS_DATA");
                    res.status(201).json("succsess to delete thread ".concat(threadId));
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    res.status(500).json({ error: "Failed to delete" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    findAll: findAll,
    findOne: findOne,
    create: create,
    update: update,
    deleted: deleted,
    findAllByName: findAllByName,
    findAllMediaByName: findAllMediaByName,
};
//# sourceMappingURL=thread-controller.js.map