"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAccountSchema = exports.UpdateAccountSchema = exports.createAccountSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createAccountSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    quote: joi_1.default.string().optional(),
    profilePictureUrl: joi_1.default.string().uri().optional(),
    coverPictureUrl: joi_1.default.string().uri().optional(),
});
exports.UpdateAccountSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    username: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().min(6).optional(),
    quote: joi_1.default.string().optional(),
    profilePictureUrl: joi_1.default.string().uri().optional(),
    coverPictureUrl: joi_1.default.string().uri().optional(),
});
exports.LoginAccountSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required()
});
//# sourceMappingURL=user-validator.js.map