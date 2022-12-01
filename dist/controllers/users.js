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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const models_1 = require("../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const start = Number(req.query.start) || 0;
    const [total, users] = yield Promise.all([
        models_1.UserModel.countDocuments(),
        models_1.UserModel.find({}, 'name email')
            .skip(start)
            .limit(5),
    ]);
    res.json({
        ok: true,
        users,
        total
    });
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existEmail = yield models_1.UserModel.findOne({ email });
        console.log(req.body);
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email registered in the database'
            });
        }
        const user = new models_1.UserModel(req.body);
        const salt = yield bcryptjs_1.default.genSaltSync(10);
        const passHash = yield bcryptjs_1.default.hashSync(password, salt);
        user.password = passHash;
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Please contact with admin'
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const object = req.body;
    try {
        const userDb = yield models_1.UserModel.findByIdAndUpdate(uid, object);
        console.log(userDb);
        if (!userDb) {
            return res.status(401).json({
                ok: false,
                msg: 'User not exist'
            });
        }
        const _a = req.body, { password, google, email } = _a, data = __rest(_a, ["password", "google", "email"]);
        if (userDb.email !== email) {
            const existEmail = yield models_1.UserModel.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email registered in the database'
                });
            }
        }
        data.email = email;
        const userUpdated = yield models_1.UserModel.findByIdAndUpdate(uid, data, { new: true });
        res.json(userUpdated);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Please contact with admin',
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const userDb = yield models_1.UserModel.findById(uid);
        if (!userDb) {
            return res.status(401).json({
                ok: false,
                msg: 'User not exist'
            });
        }
        yield models_1.UserModel.findByIdAndUpdate(uid, { estado: false });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Please contact with admin',
            error
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map