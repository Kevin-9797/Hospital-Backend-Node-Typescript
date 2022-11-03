"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medical = void 0;
const mongoose_1 = require("mongoose");
const MedicalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
});
MedicalSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v } = _a, object = __rest(_a, ["__v"]);
    return object;
});
exports.Medical = (0, mongoose_1.model)('Medical', MedicalSchema);
//# sourceMappingURL=medical.js.map