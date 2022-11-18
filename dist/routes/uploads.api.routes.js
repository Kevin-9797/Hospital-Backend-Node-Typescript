"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const uploads_1 = require("../controllers/uploads");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const validate_zone_1 = require("../middlewares/validate-zone");
const router = (0, express_1.Router)();
// router.use( expressFileUpload() );
router.post('/:collection/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id', 'The id has to be a valid mongo id').isMongoId(),
    validate_zone_1.validateZones
], uploads_1.updateImgCloudinary);
router.get('/:collection/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id', 'The id has to be a valid mongo id').isMongoId(),
    validate_zone_1.validateZones
], uploads_1.getFileCloudinary);
router.get('*', (req, res) => {
    return res.status(404).json({
        ok: false,
        msg: 'Not found',
    });
});
module.exports = router;
//# sourceMappingURL=uploads.api.routes.js.map