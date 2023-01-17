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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    try {
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'There is no token in the request'
            });
        }
        const resp = jsonwebtoken_1.default.verify(token, process.env.JWT_PRIVATE_KEY);
        req.uid = resp.uid;
        const userData = yield user_1.UserModel.findById(resp.uid);
        req.user = userData;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Wrong token'
        });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map