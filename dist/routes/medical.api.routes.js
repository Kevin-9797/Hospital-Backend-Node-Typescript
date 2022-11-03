"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const medicals_1 = require("../controllers/medicals");
const router = (0, express_1.Router)();
router.get('/', [], medicals_1.getMedicals);
router.post('/', [
    validate_jwt_1.validateJWT
], medicals_1.createMedical);
router.put('/:uid', [
    validate_jwt_1.validateJWT
], medicals_1.updateMedical);
router.delete('/:uid', [
    validate_jwt_1.validateJWT
], medicals_1.deleteMedical);
module.exports = router;
//# sourceMappingURL=medical.api.routes.js.map