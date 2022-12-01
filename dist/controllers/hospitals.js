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
exports.deleteHospital = exports.updateHospital = exports.createHospital = exports.getHospitals = void 0;
const hospital_1 = require("../models/hospital");
const getHospitals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitals = yield hospital_1.Hospital.find().populate('user', 'name img');
    res.json({
        ok: true,
        msg: 'getHOSPITALS'
    });
});
exports.getHospitals = getHospitals;
const createHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const hospital = new hospital_1.Hospital(Object.assign({ user: uid }, req.body));
    try {
        const hospitalDb = yield hospital.save();
        res.json({
            ok: true,
            msg: 'createHospital',
            hospitalDb
        });
    }
    catch (error) {
    }
});
exports.createHospital = createHospital;
const updateHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const changesHospital = Object.assign({}, req.body);
    try {
        const hospital = yield hospital_1.Hospital.findById(uid);
        if (!hospital) {
            return res.status(401).json({
                ok: false,
                msg: ''
            });
        }
        const newHospital = yield hospital_1.Hospital.findByIdAndUpdate(uid, changesHospital, { new: true });
        res.json({
            ok: true,
            newHospital
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Error updating hospital '
        });
    }
});
exports.updateHospital = updateHospital;
const deleteHospital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const changesHospital = Object.assign({}, req.body);
    try {
        const hospital = yield hospital_1.Hospital.findById(uid);
        if (!hospital) {
            return res.status(401).json({
                ok: false,
                msg: ''
            });
        }
        const newHospital = yield hospital_1.Hospital.findByIdAndUpdate(uid, { isDeleted: true }, { new: true });
        res.json({
            ok: true,
            newHospital
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Error updating hospital '
        });
    }
});
exports.deleteHospital = deleteHospital;
//# sourceMappingURL=hospitals.js.map