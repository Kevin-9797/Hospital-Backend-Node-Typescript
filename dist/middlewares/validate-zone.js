"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateZones = void 0;
const express_validator_1 = require("express-validator");
const validateZones = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors) {
        return res.status(400).json({
            ok: false,
            errors
        });
    }
    next();
};
exports.validateZones = validateZones;
//# sourceMappingURL=validate-zone.js.map