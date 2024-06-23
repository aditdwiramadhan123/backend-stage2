"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateThreadSchema = exports.createThreadSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createThreadSchema = joi_1.default.object({
    caption: joi_1.default.string().required(),
    imageUrl: joi_1.default.string().uri().optional()
});
exports.updateThreadSchema = joi_1.default.object({
    caption: joi_1.default.string().optional(),
    imageUrl: joi_1.default.string().uri().optional()
});
//# sourceMappingURL=thread-validator.js.map