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
var user_service_1 = __importDefault(require("../services/user-service"));
var verify_service_1 = __importDefault(require("../services/verify-service"));
var client_1 = require("@prisma/client");
var user_service_2 = __importDefault(require("../services/user-service"));
var nodemailer_1 = require("../libs/nodemailer");
var prisma = new client_1.PrismaClient();
function findAllByName(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var name_1, allUsers, usersFormService, userId_1, users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    name_1 = req.query.name;
                    console.log("ini username: ", name_1);
                    if (!name_1) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Failed to find users: 'name' parameter is required" })];
                    }
                    return [4 /*yield*/, user_service_2.default.findAllUsers()];
                case 1:
                    allUsers = _a.sent();
                    usersFormService = allUsers.filter(function (user) {
                        return user.name.toLowerCase() === name_1.toLowerCase();
                    });
                    userId_1 = res.locals.user.id;
                    console.log("ini user id", userId_1);
                    users = usersFormService === null || usersFormService === void 0 ? void 0 : usersFormService.map(function (user) {
                        return {
                            id: user.id,
                            name: user.name,
                            profilePictureUrl: user.profilePictureUrl,
                            username: user.username,
                            isFollow: user.following.some(function (follower) {
                                return follower.followerId === userId_1;
                            }),
                        };
                    });
                    console.log("ini users", users);
                    res.status(201).json(users);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).json({ error: "Failed to found users" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findOne(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.query.username;
                    console.log("ini username: ", username);
                    if (!username) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Failed to find users: 'name' parameter is required" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log("username", username);
                    return [4 /*yield*/, user_service_1.default.findUserByName(username)];
                case 2:
                    user = _a.sent();
                    res.status(201).json(user);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.status(500).json({ error: "Failed to find user" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// register
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data_1, allUser, fullUrl, isUsernameTaken, isEmailUserTaken, newUser, info, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    data_1 = req.body;
                    return [4 /*yield*/, user_service_2.default.findAllUsers()];
                case 1:
                    allUser = _a.sent();
                    fullUrl = req.protocol + "://" + req.get("host");
                    isUsernameTaken = allUser.some(function (user) {
                        return user.username == data_1.username;
                    });
                    if (isUsernameTaken) {
                        return [2 /*return*/, res.status(409).json({
                                error: "username already in use",
                                message: "The username you have entered is already associated with another account.",
                            })];
                    }
                    isEmailUserTaken = allUser.some(function (user) {
                        return user.email === data_1.email;
                    });
                    if (isEmailUserTaken) {
                        return [2 /*return*/, res.status(409).json({
                                error: "Email already in use",
                                message: "The email address you have entered is already associated with another account.",
                            })];
                    }
                    return [4 /*yield*/, user_service_1.default.createUser(data_1)];
                case 2:
                    newUser = _a.sent();
                    return [4 /*yield*/, nodemailer_1.transporter.sendMail({
                            from: "B54-circle <aditjimmysullivan@gmail.com>",
                            to: newUser.newUser.email,
                            subject: "Verification Link",
                            html: "<a href=\"".concat(fullUrl, "/api/v1/verify-email?token=").concat(newUser.token, "\">Klik untuk verifikasi email kamu!</a>"), // html body
                        })];
                case 3:
                    info = _a.sent();
                    return [4 /*yield*/, verify_service_1.default.createVerification(newUser.token, "EMAIL")];
                case 4:
                    _a.sent();
                    res.status(201).json(newUser);
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    res.status(500).json({ error: error_3 });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, data, updatedUser, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    username = res.locals.user.username;
                    data = __assign(__assign({}, req.body), { profilePictureUrl: req.file ? req.file.path : null });
                    console.log("ini req", req.file);
                    console.log(data);
                    return [4 /*yield*/, user_service_1.default.updateUser(username, data)];
                case 1:
                    updatedUser = _a.sent();
                    // Cek apakah updateUser berhasil
                    if (!updatedUser) {
                        return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                    }
                    // Jika berhasil, kirim respons
                    res.status(201).json(updatedUser);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    // Tangani kesalahan
                    console.error("Error updating user:", error_4);
                    res.status(500).json({ error: "Failed to update user" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleted(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    username = res.locals.user.username;
                    console.log(username);
                    return [4 /*yield*/, user_service_2.default.deleteUser(username)];
                case 1:
                    _a.sent();
                    res.status(201).json("succsess to delete user ".concat(username));
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(500).json({ error: "Failed to delete" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var dataUser, Userlogin, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    dataUser = req.body;
                    return [4 /*yield*/, user_service_2.default.loginUser(dataUser)];
                case 1:
                    Userlogin = _a.sent();
                    res.status(201).json(Userlogin);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error("Error logging in user:", error_6);
                    // Customize the response based on the error type
                    if (error_6.message === "User not found" || error_6.message === "email not verified" || error_6.message === "Password not valid") {
                        res.status(400).json({ error: error_6.message });
                    }
                    else if (error_6.name === "ValidationError") {
                        res.status(422).json({ error: error_6.message });
                    }
                    else {
                        res.status(500).json({ error: "An unexpected error occurred" });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function check(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            try {
                res.json(res.locals.user);
                token = req.headers.authorization;
                console.log(token);
            }
            catch (error) {
                res.status(500).json({ error: error });
            }
            return [2 /*return*/];
        });
    });
}
function verifyEmail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, frontendUrl, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = req.query.token;
                    return [4 /*yield*/, verify_service_1.default.verify(token)];
                case 1:
                    _a.sent();
                    frontendUrl = process.env.FRONTEND_URL;
                    res.redirect("".concat(frontendUrl));
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    res.status(500).json({ error: "Failed to login" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    findOne: findOne,
    create: create,
    deleted: deleted,
    login: login,
    update: update,
    check: check,
    findAllByName: findAllByName,
    verifyEmail: verifyEmail,
};
//# sourceMappingURL=user-controller.js.map