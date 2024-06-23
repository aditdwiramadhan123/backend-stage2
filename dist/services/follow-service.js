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
function findAll() {
    return __awaiter(this, void 0, void 0, function () {
        var follower, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.follow.findMany({
                            select: {
                                follower: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true,
                                        profilePictureUrl: true,
                                        // follower
                                        following: {
                                            select: {
                                                followerId: true,
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                case 1:
                    follower = (_a.sent());
                    return [2 /*return*/, follower];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching all follower:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findAllFollowingUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var following, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.follow.findMany({
                            where: { followerId: userId },
                            select: {
                                following: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true,
                                        profilePictureUrl: true,
                                        // follower
                                        following: {
                                            select: {
                                                followerId: true,
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                case 1:
                    following = (_a.sent());
                    return [2 /*return*/, following];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching all following:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findAllFollowerUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var follower, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.follow.findMany({
                            where: { followingId: userId },
                            select: {
                                follower: {
                                    select: {
                                        id: true,
                                        name: true,
                                        username: true,
                                        profilePictureUrl: true,
                                        // follower
                                        following: {
                                            select: {
                                                followerId: true,
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                case 1:
                    follower = (_a.sent());
                    return [2 /*return*/, follower];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error fetching all follower:", error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findFollowById(followId) {
    return __awaiter(this, void 0, void 0, function () {
        var follow, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.follow.findUnique({
                            where: { id: followId },
                        })];
                case 1:
                    follow = _a.sent();
                    return [2 /*return*/, follow];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error fetching follow by ID:", error_4);
                    throw error_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createFollow(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function () {
        var followData, newFollow, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    followData = { followerId: followerId, followingId: followingId };
                    return [4 /*yield*/, prisma.follow.create({
                            data: followData,
                        })];
                case 1:
                    newFollow = _a.sent();
                    return [2 /*return*/, newFollow];
                case 2:
                    error_5 = _a.sent();
                    console.error("Error creating follow:", error_5);
                    throw new Error("Failed to create follow");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function unFollow(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedFollow, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.follow.delete({
                            where: {
                                followerId_followingId: {
                                    followerId: followerId,
                                    followingId: followingId,
                                },
                            },
                        })];
                case 1:
                    deletedFollow = _a.sent();
                    return [2 /*return*/, deletedFollow];
                case 2:
                    error_6 = _a.sent();
                    console.error("Error unfollowing user:", error_6);
                    throw new Error("Failed to unfollow");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function isFollowing(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function () {
        var follow, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.follow.findUnique({
                            where: {
                                followerId_followingId: {
                                    followerId: followerId,
                                    followingId: followingId,
                                },
                            },
                        })];
                case 1:
                    follow = _a.sent();
                    return [2 /*return*/, !!follow];
                case 2:
                    error_7 = _a.sent();
                    console.error("Error checking follow status:", error_7);
                    throw new Error("Failed to check follow status");
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    findAll: findAll,
    findAllFollowerUser: findAllFollowerUser,
    findAllFollowingUser: findAllFollowingUser,
    createFollow: createFollow,
    unFollow: unFollow,
    isFollowing: isFollowing,
};
//# sourceMappingURL=follow-service.js.map