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
exports.renewToken = exports.googleSignIn = exports.loginUser = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
const google_verify_1 = require("../helpers/google-verify");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email + 'aca esta el email');
    try {
        const userDb = yield user_1.UserModel.findOne({ email });
        if (!userDb) {
            return res.status(500).json({
                msg: 'Email not exist',
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, userDb.password);
        if (!validPassword) {
            return res.status(500).json({
                msg: 'Email or password are incorrect',
            });
        }
        const token = yield (0, jwt_1.generateJWT)(userDb._id);
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
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token: oldToken } = req.body;
    console.log(req.body, 'este es el body');
    const { name, email, img } = yield (0, google_verify_1.googleVerify)(oldToken);
    let userDb = yield user_1.UserModel.findOne({ email });
    let user;
    if (userDb === null) {
        const data = {
            name,
            email,
            password: '@@@',
            img,
            isGoogle: true
        };
        user = new user_1.UserModel(data);
        console.log(user);
    }
    else {
        user = userDb;
        user.isGoogle = true;
    }
    yield user.save();
    if (user.isDeleted) {
        return res.status(401).json({
            msg: 'User not found '
        });
    }
    const token = yield (0, jwt_1.generateJWT)(user._id);
    res.json({
        user,
        token
    });
});
exports.googleSignIn = googleSignIn;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const token = yield (0, jwt_1.generateJWT)(uid);
    res.json({
        ok: true,
        token
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map