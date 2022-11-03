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
exports.deleteMedical = exports.updateMedical = exports.createMedical = exports.getMedicals = void 0;
const medical_1 = require("../models/medical");
const getMedicals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medicals = yield medical_1.Medical.find().populate('user', 'name img')
        .populate('hospital', 'name img ');
    res.json({
        ok: true,
        msg: 'getHOSPITALS',
        medicals
    });
});
exports.getMedicals = getMedicals;
const createMedical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const medical = new medical_1.Medical(Object.assign({ user: uid, hospital: req.body.hospitalId }, req.body));
    try {
        const medicalDb = yield medical.save();
        res.json({
            ok: true,
            msg: 'createHospital',
            medicalDb
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal server error',
            error
        });
    }
});
exports.createMedical = createMedical;
const updateMedical = (req, res) => {
    res.json({
        ok: true,
        msg: 'updateMedical'
    });
};
exports.updateMedical = updateMedical;
const deleteMedical = (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteMedical'
    });
};
exports.deleteMedical = deleteMedical;
//# sourceMappingURL=medicals.js.map