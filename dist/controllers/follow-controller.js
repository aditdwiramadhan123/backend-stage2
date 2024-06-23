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
var follow_service_1 = __importDefault(require("../services/follow-service"));
var user_service_1 = __importDefault(require("../services/user-service"));
function findAllFollowing(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userLoginId_1, userId, userIdNumber, followingService, following_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userLoginId_1 = res.locals.user.id;
                    userId = req.params.userId;
                    userIdNumber = Number(userId);
                    return [4 /*yield*/, follow_service_1.default.findAllFollowingUser(userIdNumber)];
                case 1:
                    followingService = _a.sent();
                    following_1 = followingService.map(function (following) {
                        return {
                            id: following.following.id,
                            name: following.following.name,
                            username: following.following.username,
                            profilePictureUrl: following.following.profilePictureUrl,
                            isFollow: following.following.following.some(function (following) {
                                return userLoginId_1 === following.followerId;
                            }),
                        };
                    });
                    res.status(200).json(following_1);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).json({ error: "Failed to find following users" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findAllFollowers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userLoginId_2, userId, userIdNumber, followersService, followers, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userLoginId_2 = res.locals.user.id;
                    userId = req.params.userId;
                    userIdNumber = Number(userId);
                    return [4 /*yield*/, follow_service_1.default.findAllFollowerUser(userIdNumber)];
                case 1:
                    followersService = _a.sent();
                    followers = followersService.map(function (follower) {
                        return {
                            id: follower.follower.id,
                            name: follower.follower.name,
                            username: follower.follower.username,
                            profilePictureUrl: follower.follower.profilePictureUrl,
                            isFollow: follower.follower.following.some(function (following) {
                                return userLoginId_2 === following.followerId;
                            }),
                        };
                    });
                    res.status(200).json(followers);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json({ error: "Failed to find followers" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function suggestFriends(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userLoginId_3, usersService, users, suggestFriends_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userLoginId_3 = res.locals.user.id;
                    return [4 /*yield*/, user_service_1.default.findAllUsers()];
                case 1:
                    usersService = _a.sent();
                    users = usersService.map(function (user) {
                        return {
                            id: user.id,
                            name: user.name,
                            username: user.username,
                            profilePictureUrl: user.profilePictureUrl,
                            isFollow: user.following.some(function (following) {
                                return userLoginId_3 === following.followerId;
                            }),
                        };
                    });
                    suggestFriends_1 = users.filter(function (user) {
                        return (user.isFollow == false) && (user.id != userLoginId_3);
                    });
                    res.status(200).json(suggestFriends_1);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({ error: "Failed to find followers" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function following(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, followingId, followingIdNumber, isFollowing, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    userId = res.locals.user.id;
                    followingId = req.params.followingId;
                    followingIdNumber = Number(followingId);
                    // Validasi ID yang diberikan
                    if (isNaN(followingIdNumber)) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid following ID" })];
                    }
                    return [4 /*yield*/, follow_service_1.default.isFollowing(userId, followingIdNumber)];
                case 1:
                    isFollowing = _a.sent();
                    response = void 0;
                    if (!isFollowing) return [3 /*break*/, 3];
                    return [4 /*yield*/, follow_service_1.default.unFollow(userId, followingIdNumber)];
                case 2:
                    response = _a.sent();
                    res.status(200).json(response);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, follow_service_1.default.createFollow(userId, followingIdNumber)];
                case 4:
                    response = _a.sent();
                    res.status(201).json(response);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.error("Error handling follow/unfollow:", error_4);
                    res.status(500).json({ error: "Failed to handle follow/unfollow request" });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function unFollow(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, followingId, userIdNumber, followingIdNumber, deletedFollow, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.params, userId = _a.userId, followingId = _a.followingId;
                    userIdNumber = Number(userId);
                    followingIdNumber = Number(followingId);
                    return [4 /*yield*/, follow_service_1.default.unFollow(userIdNumber, followingIdNumber)];
                case 1:
                    deletedFollow = _b.sent();
                    res.status(200).json(deletedFollow);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    res.status(500).json({ error: "Failed to delete follow" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = { findAllFollowing: findAllFollowing, findAllFollowers: findAllFollowers, following: following, unFollow: unFollow, suggestFriends: suggestFriends };
//# sourceMappingURL=follow-controller.js.map