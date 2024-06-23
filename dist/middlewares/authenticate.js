"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    var authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "token ".concat(authorizationHeader) });
    }
    var token = authorizationHeader.split(" ")[1];
    try {
        var user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "token ".concat(authorizationHeader) });
    }
}
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map