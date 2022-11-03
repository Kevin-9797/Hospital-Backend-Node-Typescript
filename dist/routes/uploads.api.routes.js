"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const uploads_1 = require("../controllers/uploads");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const validate_jwt_1 = require("../middlewares/validate-jwt");
const validate_zone_1 = require("../middlewares/validate-zone");
const router = (0, express_1.Router)();
router.use((0, express_fileupload_1.default)());
router.post('/:collection/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id', 'The id has to be a valid mongo id').isMongoId(),
    validate_zone_1.validateZones
], uploads_1.updateImgCloudinary);
router.get('*', (req, res) => {
    return res.status(404).json({
        ok: false,
        msg: 'Not found',
    });
});
module.exports = router;
//# sourceMappingURL=uploads.api.routes.js.map