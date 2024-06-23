"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentSchema = exports.createCommentSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createCommentSchema = joi_1.default.object({
    content: joi_1.default.string().required(),
    imageUrl: joi_1.default.string().uri().optional(),
    authorId: joi_1.default.number().integer().required(),
    threadId: joi_1.default.number().integer().required(),
});
exports.updateCommentSchema = joi_1.default.object({
    content: joi_1.default.string().optional(),
    imageUrl: joi_1.default.string().uri().optional()
});
//# sourceMappingURL=comment-validator.js.map