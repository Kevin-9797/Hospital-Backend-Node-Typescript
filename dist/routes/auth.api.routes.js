"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validate_zone_1 = require("../middlewares/validate-zone");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'Email is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email not valid').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required').not().isEmpty(),
    validate_zone_1.validateZones
], auth_1.loginUser);
router.post('/google', [], auth_1.googleSignIn);
router.get('*', (req, res) => {
    return res.status(404).json({
        ok: false,
        msg: 'Not found',
    });
});
module.exports = router;
//# sourceMappingURL=auth.api.routes.js.map