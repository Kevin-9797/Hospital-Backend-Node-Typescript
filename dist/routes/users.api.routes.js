"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const validate_zone_1 = require("../middlewares/validate-zone");
const express_validator_1 = require("express-validator");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get('/', [
    validate_jwt_1.validateJWT,
], users_1.getUsers);
router.post('/', [
    (0, express_validator_1.check)('name', 'Email is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Email is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is required').isEmail(),
    validate_zone_1.validateZones
], users_1.createUser);
router.put('/:uid', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name', 'Email is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Email is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is required').isEmail(),
    validate_zone_1.validateZones
], users_1.updateUser);
module.exports = router;
//# sourceMappingURL=users.api.routes.js.map