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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCollection = exports.getSearch = void 0;
const user_1 = require("../models/user");
const hospital_1 = require("../models/hospital");
const medical_1 = require("../models/medical");
const getSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.params.search;
    const regex = new RegExp(search, 'i');
    const [users, medicals, hospitals] = yield Promise.all([
        user_1.UserModel.find({ name: regex }),
        hospital_1.Hospital.find({ name: regex }),
        medical_1.Medical.find({ name: regex })
    ]);
    res.json({
        ok: false,
        msg: 'Get search',
        users,
        medicals,
        hospitals
    });
});
exports.getSearch = getSearch;
const searchCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = req.params.collection;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');
    let data = [];
    switch (collection) {
        case 'users':
            const info = {
                path: 'user',
                options: { sort: { position: -1 } },
                strictPopulate: false,
                populate: {
                    path: 'email',
                    select: 'name',
                    populate: {
                        path: 'permissions'
                    }
                }
            };
            data = yield user_1.UserModel.find({ name: regex }).populate(info);
            return res.json({
                ok: true,
                results: data
            });
            break;
        case 'medicals':
            data = yield medical_1.Medical.find({ name: regex }).populate('medicals', 'name img');
            break;
        case 'hospitals':
            data = yield hospital_1.Hospital.find({ name: regex })
                .populate('hospitals', 'name img');
            break;
        default:
            return res.status(400).json({
                msg: 'The values ​​allowed in the collection are: users,medicals,hospitals'
            });
            break;
    }
});
exports.searchCollection = searchCollection;
//# sourceMappingURL=searchs.js.map