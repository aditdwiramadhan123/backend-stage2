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
var user_validator_1 = require("../validators/user-validator");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cloudinary_config_1 = __importDefault(require("../cloudinary-config"));
var prisma = new client_1.PrismaClient();
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.user.findMany({
                            include: {
                                followers: { select: { followingId: true } },
                                following: { select: { followerId: true } },
                            },
                        })];
                case 1:
                    users = (_a.sent());
                    return [2 /*return*/, users];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching all users:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findAllUsersByName(username) {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.user.findMany({
                            where: {
                                username: username,
                            },
                        })];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, users];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching all users:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findUserByName(username) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: { username: username },
                            include: {
                                followers: { select: { followingId: true } },
                                following: { select: { followerId: true } },
                                _count: { select: { followers: true, following: true } },
                            },
                        })];
                case 1:
                    user = (_a.sent());
                    return [2 /*return*/, user];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error fetching user by username:", error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createUser(userData) {
    return __awaiter(this, void 0, void 0, function () {
        var validate, salt, hashedPassword, newUser, jwtSecret, token, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    validate = user_validator_1.createAccountSchema.validate(userData);
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    salt = 10;
                    return [4 /*yield*/, bcrypt_1.default.hash(userData.password, salt)];
                case 1:
                    hashedPassword = _a.sent();
                    userData.password = hashedPassword;
                    return [4 /*yield*/, prisma.user.create({
                            data: userData,
                        })];
                case 2:
                    newUser = _a.sent();
                    jwtSecret = process.env.JWT_SECRET;
                    token = jsonwebtoken_1.default.sign(newUser, jwtSecret);
                    return [2 /*return*/, { token: token, newUser: newUser }];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error creating user:", error_4);
                    throw error_4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateUser(username, updateData) {
    return __awaiter(this, void 0, void 0, function () {
        var profilePictureUrl, error_5, updatedUser, jwtSecret, token, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    profilePictureUrl = { secure_url: null };
                    if (!updateData.profilePictureUrl) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, cloudinary_config_1.default)(updateData.profilePictureUrl)];
                case 2:
                    profilePictureUrl = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error("Error uploading profile picture to Cloudinary:", error_5);
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, prisma.user.update({
                        where: { username: username },
                        data: __assign(__assign({}, updateData), { profilePictureUrl: profilePictureUrl.secure_url }),
                        include: {
                            followers: { select: { followingId: true } },
                            following: { select: { followerId: true } },
                            _count: { select: { followers: true, following: true } },
                        },
                    })];
                case 5:
                    updatedUser = (_a.sent());
                    if (!updatedUser)
                        throw new Error("User not found");
                    jwtSecret = process.env.JWT_SECRET;
                    token = jsonwebtoken_1.default.sign(updatedUser, jwtSecret);
                    return [2 /*return*/, { token: token, updatedUser: updatedUser }];
                case 6:
                    error_6 = _a.sent();
                    console.error("Error updating user:", error_6);
                    throw error_6;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedUser, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.user.delete({
                            where: { username: username },
                        })];
                case 1:
                    deletedUser = _a.sent();
                    return [2 /*return*/, deletedUser];
                case 2:
                    error_7 = _a.sent();
                    console.error("Error deleting user:", error_7);
                    throw error_7;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function loginUser(userData) {
    return __awaiter(this, void 0, void 0, function () {
        var validate, userDB, isValidPassword, jwtSecret, token, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    validate = user_validator_1.LoginAccountSchema.validate(userData);
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: {
                                email: userData.email,
                            },
                            include: {
                                followers: { select: { followingId: true } },
                                following: { select: { followerId: true } },
                                _count: { select: { followers: true, following: true } },
                            },
                        })];
                case 1:
                    userDB = (_a.sent());
                    if (!userDB)
                        throw new Error("User not found");
                    if (!userDB.isVerified)
                        throw new Error("email not verified");
                    return [4 /*yield*/, bcrypt_1.default.compare(userData.password, userDB.password)];
                case 2:
                    isValidPassword = _a.sent();
                    if (!isValidPassword)
                        throw new Error("Password not valid");
                    delete userDB.password;
                    jwtSecret = process.env.JWT_SECRET;
                    token = jsonwebtoken_1.default.sign(userDB, jwtSecret);
                    return [2 /*return*/, { token: token, userDB: userDB }];
                case 3:
                    error_8 = _a.sent();
                    console.error("Error logging in user:", error_8);
                    throw error_8;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    findAllUsers: findAllUsers,
    findUserByName: findUserByName,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    loginUser: loginUser,
    findAllUsersByName: findAllUsersByName,
};
//# sourceMappingURL=user-service.js.map