"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const hospitals_1 = require("../controllers/hospitals");
const validate_zone_1 = require("../middlewares/validate-zone");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', [], hospitals_1.getHospitals);
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('hospitalId', 'The hospitalId has to be a valid mongo id').isMongoId(),
    validate_zone_1.validateZones
], hospitals_1.createHospital);
router.put('/:uid', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    validate_zone_1.validateZones
], hospitals_1.updateHospital);
router.delete('/:uid', [
    validate_jwt_1.validateJWT,
], hospitals_1.deleteHospital);
module.exports = router;
//# sourceMappingURL=hospital.api.routes.js.map