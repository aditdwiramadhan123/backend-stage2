"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentReplySchema = exports.createCommentReplySchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createCommentReplySchema = joi_1.default.object({
    content: joi_1.default.string().required(),
    imageUrl: joi_1.default.string().uri().optional(),
    authorId: joi_1.default.number().integer().required(),
    commentId: joi_1.default.number().integer().required(),
});
// Validator untuk UpdateCommentReplyDTO
exports.updateCommentReplySchema = joi_1.default.object({
    content: joi_1.default.string().optional(),
    imageUrl: joi_1.default.string().uri().optional(),
});
//# sourceMappingURL=comment-reply-validator.js.map