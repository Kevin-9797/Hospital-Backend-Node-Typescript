"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    try {
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'There is no token in the request'
            });
        }
        const resp = jsonwebtoken_1.default.verify(token, process.env.JWT_PRIVATE_KEY);
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Wrong token'
        });
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map