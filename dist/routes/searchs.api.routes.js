"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchs_1 = require("../controllers/searchs");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get('/:search', validate_jwt_1.validateJWT, searchs_1.getSearch);
router.get('/:collection/:search', validate_jwt_1.validateJWT, searchs_1.searchCollection);
module.exports = router;
//# sourceMappingURL=searchs.api.routes.js.map