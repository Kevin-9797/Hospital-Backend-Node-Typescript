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
exports.loginUser = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userDb = yield user_1.UserModel.findOne({ email });
        if (!userDb) {
            res.status(500).json({
                msg: 'Email registered in the database',
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, userDb.password);
        if (!validPassword) {
            res.status(500).json({
                msg: 'Email or password are incorrect',
            });
        }
        const token = yield (0, jwt_1.generateJWT)(userDb.uid);
        res.json({
            ok: true,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Please contact with admin',
            error
        });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map